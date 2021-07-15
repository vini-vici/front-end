#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VicciStack } from '../lib/vicci-stack';
import accounts from '../lib/accounts.json';
// make the app
const app = new cdk.App();
// Loop through accounts and create a new stack
for(const account of accounts) {
  new VicciStack(app, `Vicci-${account.accountId}-${account.stage}-${account.region}`, {
    stage: account.stage,
    env: {
      region: account.region,
      account: account.accountId
    }
  });
}
