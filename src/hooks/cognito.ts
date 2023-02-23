import Amplify from '@aws-amplify/core';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
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

export function useCognito(suspense = true): UseQueryResult<CognitoReturned> {
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
    {
      onError(e) {
        console.warn('whoops', e, typeof e);
      },
      suspense,
    }
  );
}

interface SignupUser {
  username: string;
  password: string;
  email: string;
  preferredUsername?: string;
}

interface SignupData {
  username: string;
  email: string;
  preferredUsername: string;
  needsVerification: boolean;
}
// eslint-disable-next-line no-undef
export function useSignupUser(): UseMutationResult<SignupData, Error> {
  return useMutation(['signupUser'], async ({
    username,
    password,
    email,
    preferredUsername,
    code,
  }: SignupUser & { code: string; },) => {
    if (!code) {

      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          preferred_username: preferredUsername,
        }
      });

      return {
        username,
        email,
        preferredUsername,
        needsVerification: true,
      };
    } else {
      const data = await Auth.confirmSignUp(username, code);
      if (data === 'SUCCESS') {
        return {
          username,
          email,
          preferredUsername,
          needsVerification: false,
        };
      }
    }
  });
}

export function useCognitoLogin(): UseMutationResult<CognitoReturned, Error> {
  const qc = useQueryClient();
  return useMutation(
    ['loginUser'],
    async ({
      username,
      password
    }: { username: string; password: string }) => {
      try {
        const user = await Auth.signIn(username, password);
        const attributes = await Auth.currentUserInfo();
        return {
          username: user.getUsername(),
          idToken: user.getSignInUserSession().getIdToken().getJwtToken(),
          accessToken: user.getSignInUserSession().getAccessToken().getJwtToken(),
          preferredUsername: attributes.attributes.preferred_username,
        };
      } catch (e) {
        console.info(e);
        throw e;
      }
    },
    {
      onSuccess() {
        qc.invalidateQueries(['fetchCognitoUser']);
      }
    }
  );
}

export function useCognitoLogout() {
  const qc = useQueryClient();
  return useMutation(
    ['logoutCognitoUser'],
    async () => {
      try {

        await Auth.signOut({ global: true });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    {
      onSuccess() {
        qc.setQueryData(['fetchTodos'], undefined);
        qc.invalidateQueries(['fetchCognitoUser']);
        qc.invalidateQueries(['fetchTodos']);
      }
    }
  );
}

export interface UpdatePreference {
  oldPassword: string;
  password: string;
  preferredUsername: string;
  email: string;
}

export function useUpdatePreferences(suspense = true) {
  const cognito = useCognito();
  return useMutation(
    ['updateCognitoUser'],
    async ({ oldPassword, password, preferredUsername, email }: UpdatePreference) => {
      const user = await Auth.currentAuthenticatedUser()
      if(password !== '' && oldPassword !== '') {
        try {
          const passwordResponse = await Auth.changePassword(user, oldPassword, password)
          console.info(passwordResponse);
        } catch (e) {
          console.error(e);
        }
      }
    }
  );
}