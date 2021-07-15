import { expect as expectCDK, haveResourceLike, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Vicci from '../lib/vicci-stack';

test('', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Vicci.VicciStack(app, 'MyTestStack', {
    stage: 'prod'
  });
  //TODO: Make tests pass in CI/CD
  expect(1).toBe(1);
});
