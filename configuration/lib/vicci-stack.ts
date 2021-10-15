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

import {
  PublicHostedZone,
  ARecord,
  RecordTarget
} from '@aws-cdk/aws-route53';

import * as certs from '@aws-cdk/aws-certificatemanager';

export interface VicciStackProps extends cdk.StackProps {
  stage?: string;
}
/**
 * What we are going to need
 * * S3 Bucket
 * * CDN Distribution from said S3 bucket
 * * (prod only) Route53 domain + Certificate
 * * 
 */
export class VicciStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: VicciStackProps) {
    super(scope, id, props);
    const {
      stage = 'beta'
    } = props;

    const zone = PublicHostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'vicci.dev'
    });

    const certificate = new certs.DnsValidatedCertificate(this, 'VicciDnsCertificate', {
      hostedZone: zone,
      domainName: 'vicci.dev',
      region: 'us-east-1'
    });

    // let certificate: DnsValidatedCertificate;
    const domainNames = stage === 'prod' ? ['vicci.dev'] : undefined;
    
    // Create WebsiteBucket
    const websiteBucket = new Bucket(this, 'WebsiteBucket-'+stage);

    // Create CDN Distribution
    const distribution = new Distribution(this, 'CdnDistribution-'+stage, {
      // Need to figure out a way to do some shenanigans here.
      domainNames,
      certificate: stage === 'prod' ? certificate : undefined,
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

    // Outputs
    
    // Output to view this easily.
    new cdk.CfnOutput(this, 'CloudfrontDistribution', {
      exportName: 'CdnUrl',
      description: 'CDN Description',
      value: distribution.domainName
    });

  }
}
