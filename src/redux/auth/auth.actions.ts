import { Action } from 'redux';

export enum AuthActions {
  SET_USER = 'SET_AUTH_USER',
  RESET_USER = 'RESET_AUTH_USER'
}


interface SetAuthUserAction extends Action<AuthActions.SET_USER> {
  user: any;
}

export function setUserData(user: any): SetAuthUserAction {
  return {
    type: AuthActions.SET_USER,
    user
  };
}
type ResetAuthUserData = Action<AuthActions.RESET_USER>;
export function resetUserData(): ResetAuthUserData {
  return {
    type: AuthActions.RESET_USER,
  };
}

export type CombinedAuthActions = ResetAuthUserData | SetAuthUserAction;