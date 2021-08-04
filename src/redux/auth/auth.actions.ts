import { CognitoUser } from '@aws-amplify/auth';
import { Action } from 'redux';

export enum AuthActions {
  SET = 'SET_AUTH',
  SET_USER = 'SET_AUTH_USER'
}

interface SetAuthCodeAction extends Action<AuthActions.SET> {
  code: string;
}
export function setAuthCode(code: string): SetAuthCodeAction {
  return {
    type: AuthActions.SET,
    code
  };
}

interface SetAuthUserAction extends Action<AuthActions.SET_USER> {
  user: CognitoUser
}

export function setUserData(user: CognitoUser): SetAuthUserAction {
  return {
    type: AuthActions.SET_USER,
    user
  };
}

export type CombinedAuthActions = SetAuthCodeAction | SetAuthUserAction;