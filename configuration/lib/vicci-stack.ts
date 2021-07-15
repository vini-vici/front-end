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

import * as cognito from '@aws-cdk/aws-cognito';

import ConfigStack from './config-stack';

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

    const {
      AWS_ACCOUNT
    } = process.env;
    
    // Create WebsiteBucket
    const websiteBucket = new Bucket(this, 'WebsiteBucket-'+stage);

    // Create CDN Distribution
    const distribution = new Distribution(this, 'CdnDistribution-'+stage, {
      domainNames: [
        stage === 'gamma' ? 'staging.vicci.dev' : 'vicci.dev'
      ],
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: 'index.html',
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
        domainPrefix: stage === 'prod' ? 'vicci' : `vicci-${stage}-${this.account}`,
      }
    });

    if(stage === 'alpha') {
      userPool.addClient('local-dev', {
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
        authFlows: {
          userSrp: true
        },
        userPoolClientName: 'local dev',
        accessTokenValidity: cdk.Duration.hours(2),
      });
    } else {
      userPool.addClient('prod', {
        oAuth: {
          flows: {
            authorizationCodeGrant: true,
            implicitCodeGrant: true
          },
          callbackUrls: [distribution.domainName + '/callback'],
          logoutUrls: [distribution.distributionDomainName]
        }
      });
    }
    
    new cdk.CfnOutput(this, 'CognitoUserDomain', {
      exportName: 'CognitoUserDomain',
      value: userPoolDomain.domainName
    });

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
