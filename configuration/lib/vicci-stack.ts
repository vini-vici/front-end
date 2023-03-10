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
  PriceClass,
} from '@aws-cdk/aws-cloudfront';
import {
  S3Origin
} from '@aws-cdk/aws-cloudfront-origins';

import {
  PublicHostedZone,
} from '@aws-cdk/aws-route53';

import * as certs from '@aws-cdk/aws-certificatemanager';

function getDomainName(stage: string): string {
  if (stage === 'gamma') return 'staging.vicci.dev';
  return 'vicci.dev';
}

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
      domainName: getDomainName(stage)
    });

    const certificate = new certs.DnsValidatedCertificate(this, 'VicciDnsCertificate', {
      hostedZone: zone,
      domainName: getDomainName(stage),
      region: 'us-east-1'
    });

    // let certificate: DnsValidatedCertificate;
    const domainNames = stage === 'prod' ? ['vicci.dev'] : undefined;

    // Create WebsiteBucket
    const websiteBucket = new Bucket(this, 'WebsiteBucket-' + stage);

    // Create CDN Distribution
    const distribution = new Distribution(this, 'CdnDistribution-' + stage, {
      // Need to figure out a way to do some shenanigans here.
      domainNames,
      certificate: stage === 'prod' ? certificate : undefined,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
          responseHttpStatus: 200
        },
        // Since we are connecting via CloudFront, the actual status given to us when we try to access
        // Objects that don't exist is 403.
        {
          httpStatus: 403,
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

    // Outputs

    // Output to view this easily.
    new cdk.CfnOutput(this, 'CloudfrontDistribution', {
      exportName: 'CdnUrl',
      description: 'CDN Description',
      value: distribution.domainName
    });

  }
}
