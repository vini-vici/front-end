import * as cdk from '@aws-cdk/core';

import {
  Bucket,
} from '@aws-cdk/aws-s3';
import {
  BucketDeployment,
  Source
} from '@aws-cdk/aws-s3-deployment';
import {
  Distribution,
  PriceClass
} from '@aws-cdk/aws-cloudfront';
import {
  S3Origin
} from '@aws-cdk/aws-cloudfront-origins';

import * as appconfig from '@aws-cdk/aws-appconfig';

import * as cognito from '@aws-cdk/aws-cognito';

function getCognitoDomain(stage: string, account: string): string {
  if(stage === 'alpha') return `vicci-dev-${account}`;
  if(stage === 'beta') return 'vicci-dev';
  if(stage === 'gamma') return 'vicci-gamma';
  return 'vicci';
}

export interface VicciStackProps extends cdk.StackProps {
  stage?: string;
}
/**
 * What we are going to need
 * * S3 Bucket
 * * CDN Distribution from said S3 bucket
 * * 
 */
export class VicciStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: VicciStackProps) {
    super(scope, id, props);
    const {
      stage = 'beta'
    } = props;
    
    // Create WebsiteBucket
    const websiteBucket = new Bucket(this, 'WebsiteBucket-'+stage);

    // Create CDN Distribution
    const distribution = new Distribution(this, 'CdnDistribution-'+stage, {
      // Need to figure out a way to do some shenanigans here.
      // domainNames: [
      //   stage === 'gamma' ? 'staging.vicci.dev' : 'vicci.dev'
      // ],
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
          responseHttpStatus: 200
        }
      ],
      defaultBehavior: {
        origin: new S3Origin(websiteBucket)
      },
      // We are using the cheapest price class as we don't need everything to be shown at once.
      priceClass: PriceClass.PRICE_CLASS_100
    });

    // Deploy things.
    new BucketDeployment(this, 'AssetDeployment-'+stage, {
      sources: [Source.asset('../dist')],
      destinationBucket: websiteBucket,
      distribution
    });
    
    const userPool = new cognito.UserPool(this, 'UserPool-'+stage, {
      userPoolName:'UserPool-'+stage,
      selfSignUpEnabled: true,
      standardAttributes: {
        email: {required: true},
        profilePicture: { mutable: true, required: false}
      },
      passwordPolicy: {
        minLength: 6,
        requireSymbols: true,
        requireUppercase: true
      }
    });

    const userPoolDomain = new cognito.UserPoolDomain(this, `VicciUserDomain-${stage}`, {
      userPool,
      cognitoDomain: {
        domainPrefix: getCognitoDomain(stage, props.env?.account || '')
      }
    });

    let UserPoolClient: cognito.UserPoolClient;

    // If we are in alpha, we need to make sure the client allows access to the localhost.
    if(stage === 'alpha') {
      UserPoolClient = userPool.addClient('local-dev', {
        oAuth: {
          flows: {
            authorizationCodeGrant: true,
            implicitCodeGrant: true
          },
          callbackUrls: [
            'https://localhost:8080/callback'
          ],
          logoutUrls: [
            'https://localhost:8080/logout'
          ]
        },
        generateSecret: false,
        authFlows: {
          userSrp: true
        },
        userPoolClientName: 'local dev',
        accessTokenValidity: cdk.Duration.hours(2),
      });
    } else {
      // Otherwise we have to add it on the distribution domain name.
      UserPoolClient = userPool.addClient('prod', {
        generateSecret: false,
        oAuth: {
          flows: {
            authorizationCodeGrant: true,
            implicitCodeGrant: true
          },
          callbackUrls: ['https://' + distribution.domainName + '/callback'],
          logoutUrls: ['https://' + distribution.distributionDomainName + '/logout']
        }
      });
    }

    // AppConfig for shared profile access.
    const App = new appconfig.CfnApplication(this,`Vicci-AppConfig-${this.region}`, {
      name: 'Vicci',
      description: `Vicci for ${this.region} region`
    });

    const AppEnv = new appconfig.CfnEnvironment(this, `Vicci-AppEnv-${this.region}`, {
      applicationId: App.ref,
      name: stage,
      description: `${stage} env for Vicci app`
    });

    const AppProfile = new appconfig.CfnConfigurationProfile(this, `Vicci-AppProfile-${this.region}`, {
      applicationId: App.ref,
      locationUri: 'hosted',
      name: 'config',
    });

    const fastDeploymentStrat = new appconfig.CfnDeploymentStrategy(this, `Vicci-deployment-strat-${this.region}`, {
      deploymentDurationInMinutes: 0,
      growthFactor: 100,
      name: 'fast',
      finalBakeTimeInMinutes: 1,
      replicateTo: 'NONE'
    });

    const AppContent = new appconfig.CfnHostedConfigurationVersion(this, `Vicci-AppContent-${this.region}`, {
      applicationId: App.ref,
      configurationProfileId: AppProfile.ref,
      content: JSON.stringify({
        COGNITO_DOMAIN: userPoolDomain.baseUrl(),
        CLIENT_ID: UserPoolClient.userPoolClientId,
        POOL_ID: userPool.userPoolId,
        REGION: this.region
      }),
      contentType: 'text/json'
    });
    
    new appconfig.CfnDeployment(this, `Vicci-AppDeployment-${this.region}`, {
      applicationId: App.ref,
      configurationProfileId: AppProfile.ref,
      configurationVersion: AppContent.ref,
      deploymentStrategyId: fastDeploymentStrat.ref,
      environmentId: AppEnv.ref
    });

    // Outputs
    // Base Cognito Domain
    new cdk.CfnOutput(this, 'CognitoUserDomain', {
      exportName: 'CognitoUserDomain',
      value: userPoolDomain.domainName
    });

    new cdk.CfnOutput(this, 'AppConfig', {
      value: App.ref,
      exportName: 'AppConfigName'
    });

    // Cognito User Pool
    new cdk.CfnOutput(this, 'CognitoUserPool', {
      exportName: 'CognitoPoolId',
      value: userPool.userPoolId
    });
    
    // Output to view this easily.
    new cdk.CfnOutput(this, 'CloudfrontDistribution', {
      exportName: 'CdnUrl',
      description: 'CDN Description',
      value: distribution.domainName
    });
    // Website bucket value
    new cdk.CfnOutput(this, 'WebsiteBucketExport',{
      exportName: 'WebsiteBucket',
      value: websiteBucket.bucketName
    });
  }
}
