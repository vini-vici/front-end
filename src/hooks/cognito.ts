import React from 'react';

import { useEffect } from 'react';

import { CLIENT_ID, COGNITO_DOMAIN, POOL_ID, REGION } from '@/config.json';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

// Q: How do we do this without needing to hardcode the values for the 
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
      responseType: 'code'
    }
  }
});

/**
 * Things I want this to return
 * 1. Current signed in user
 * 2. Auth object
 * 3. SignIn
 * 4. SignUp
 * 5. SignOut
 */

interface UseCognitoProps {
  cognitoDomain?: string;
  clientId: string;
  region: string;
  poolId: string;
}

export default function useCognito(props: UseCognitoProps) {
  const [user, setUser] = React.useState<any>({});
  useEffect(()=> {
    Auth.currentUserInfo()
      .then(user => {
        console.log('user info');
        setUser(user);
      })
      .catch(console.error);
  }, []);
  // useEffect(() => {
  //   Auth.currentUserInfo().then(
  //     res => {
  //       console.log('current user', res);
  //       setUser(res);
  //       return res;
  //     }
  //   ).catch(console.error);
  //   Hub.listen('auth', event => {
  //     if(event.payload.event === 'signIn') {
  //       console.log('signin', event.payload.data);
  //       const user = {
  //         username: event.payload.data.user.username
  //       };
  //       setUser(event.payload.data.user);
  //     }

  //     if(event.payload.event === 'signOut') 
  //       setUser(null);
      
  //   });
  // }, []);
  
  return { 
    user,
    Auth, 
    signIn: (username: string, password: string) => Auth.signIn(username, password)
      .then(data => {
        console.log(data);
      })
      .catch(console.error),
    signOut: () => Auth.signOut()
      .then(res => {
        setUser(null);
        return res;
      }),
    confirmSignUp: (username: string, code: string) => Auth.confirmSignUp(username, code)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(console.error)
  };
}
