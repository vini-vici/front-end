import { UserAgent } from 'amazon-cognito-identity-js';
import { CombinedAuthActions, AuthActions } from './auth.actions';

export interface AuthState {
  idToken: string;
  authToken: string;
  username: string;
  email: string;
  phone: string;
  verified: boolean;
}

const initialAuthState: AuthState = {
  idToken: '',
  authToken: '',
  username: '',
  email: '',
  phone: '',
  verified: false
};

export default function AuthReducer(state: AuthState = initialAuthState, action: CombinedAuthActions): AuthState {
  switch(action.type){ 
    case AuthActions.SET_USER:
      return {
        ...state,
        username: action.user.username,
        email: action.user.attributes.email,
        phone: action.user.attributes.phone_number
      };
    case AuthActions.RESET_USER:
      return {
        ...state,
        ...initialAuthState
      };
    default:
      return state;
  }
}