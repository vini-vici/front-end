import React from 'react';

import { useEffect } from 'react';

import { CLIENT_ID, COGNITO_DOMAIN, POOL_ID, REGION } from '@/constants';

import Amplify, { Hub } from '@aws-amplify/core';
import Auth, { CognitoUser} from '@aws-amplify/auth';

Amplify.configure({
  Auth: {
    region: REGION,
    userPoolId: POOL_ID,
    userPoolWebClientId: CLIENT_ID,
    oauth: {
      domain: COGNITO_DOMAIN,
      scope: [
        'phone',
        'email',
        'openid'
      ],
      redirectSignIn: 'https://localhost:8080/callback',
      redirectSignOut: 'https://localhost:8080/signout',
      responseType: 'code'
    }
  }
});

/**
 * Things I want this to return
 * 1. Current signed in user
 * 2. Auth object
 */
export default function useCognito() {
  const [userData, setUserData] = React.useState<any>({});
  
  useEffect(() => {
    Hub.listen('auth', event => {
      if(event.payload.event === 'signIn') {
        console.log('signin', event.payload.data);
        const user = {
          username: event.payload.data.user.username
        };
        console.log(user);
        setUserData(event.payload.data.user);
      }

      if(event.payload.event === 'signOut') 
        setUserData({});
      
    });
  }, []);
  
  return { Auth, userData, signIn: Auth.signIn.bind(Auth) };
}
