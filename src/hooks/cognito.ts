
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetUserData, setUserData } from '@/redux/auth/auth.actions';

import { CLIENT_ID, COGNITO_DOMAIN, POOL_ID, REGION } from '@/constants';

import Amplify, { Hub } from '@aws-amplify/core';

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

export default function useCognito(): void {
  const dispatch = useDispatch();
  useEffect(() => {
    Hub.listen('auth', event => {
      if(event.payload.event === 'signIn') {
        dispatch(setUserData(event.payload.data));
      }
      if(event.payload.event === 'signOut') {
        dispatch(resetUserData());
      }
    });
  }, []);
}
