import { CombinedAuthActions, AuthActions } from './auth.actions';

export interface AuthState {
  code: string;
  authToken: string;
  details: Record<string, unknown>;
}

export default function AuthReducer(state: AuthState, action: CombinedAuthActions): AuthState {
  switch(action.type){ 
  case AuthActions.SET:
    return {
      ...state,
      code: action.code
    };
  default:
    return state;
  }
}