#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VicciStack } from '../lib/vicci-stack';
import accounts from '../lib/accounts.json';
// make the app
const app = new cdk.App();

// Create the devstack.
function createDevStack(): void {
  const { ACCOUNT_ID } = process.env;
  if(ACCOUNT_ID) {
    new VicciStack(app, `Vicci-${ACCOUNT_ID}-alpha-us-west-1`, {
      stage: 'alpha',
      env: {
        region: 'us-west-1',
        account: ACCOUNT_ID
      }
    });
  }
}

createDevStack();

// Loop through accounts and create a new stack
for(const account of accounts) {
  // Create the regular stacks too.
  new VicciStack(app, `Vicci-${account.accountId}-${account.stage}-${account.region}`, {
    stage: account.stage,
    description: `FE Vicci for ${account.stage} in ${account.region}`,
    env: {
      region: account.region,
      account: account.accountId
    }
  });
}
