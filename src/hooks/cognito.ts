import Amplify from '@aws-amplify/core';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import React from 'react';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import config from '@/config.json';
Amplify.configure({
  Auth: {
    region: config.REGION,
    userPoolId: config.POOL_ID,
    userPoolWebClientId: config.CLIENT_ID,
    oauth: {
      domain: config.COGNITO_DOMAIN,
      scope: [
        'phone',
        'email',
        'openid'
      ],
      responseType: 'code'
    }
  }
});

export interface CognitoReturned {
  username: string;
  preferredUsername: string;
  idToken: string;
  accessToken: string;
}

export function useCognito(): UseQueryResult<CognitoReturned> {
  return useQuery(
    ['fetchCognitoUser'],
    async () => {
      const user = await Auth.currentAuthenticatedUser() as CognitoUser;
      const userDetails = await Auth.currentUserInfo();
      const signedIn = user.getSignInUserSession();
      return {
        username: user.getUsername(),
        preferredUsername: userDetails.attributes.preferred_username,
        idToken: signedIn.getIdToken().getJwtToken(),
        accessToken: signedIn.getAccessToken().getJwtToken(),
      };
    },
  );
}

interface SignupUser {
  username: string;
  password: string;
  email: string;
  preferredUsername?: string;
}

export function signupUser(): UseMutationResult {
  const qc = useQueryClient();
  return useMutation(['signupUser'], async ({
    username,
    password,
    email,
    preferredUsername
  }: SignupUser) => {
    const data = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        preferred_username: preferredUsername,
      }
    });
    return data;
  }, {
    onSuccess() {
      qc.invalidateQueries(['fetchCognitoUser']);
    }
  });
}
