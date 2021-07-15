
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CLIENT_ID, COGNITO_DOMAIN, POOL_ID, REGION } from '@/constants';

import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';

Hub.listen('auth', ({ payload }) => {
  
  if(payload.event === 'signIn') {
    const userObj = payload.data?.signInUserSession?.idToken?.payload ?? {};
    console.log('SUP!!!');
  }

  if(payload.event === 'signOut') {
    console.log('signed out');
  }
});

export default {};