import { Action } from 'redux';

export enum AuthActions {
  SET = 'SET_AUTH'
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

export type CombinedAuthActions = SetAuthCodeAction;