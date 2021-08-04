import { UserAgent } from 'amazon-cognito-identity-js';
import { CombinedAuthActions, AuthActions } from './auth.actions';

export interface AuthState {
  userDetails: {
    username: string;
    email: string;
    phone: string;
    verified: boolean;
  }
}

const initialAuthState: AuthState = {
  userDetails: {
    username: '',
    email: '',
    phone: '',
    verified: false
  }
};

export default function AuthReducer(state: AuthState = initialAuthState, action: CombinedAuthActions): AuthState {
  switch(action.type){ 
    case AuthActions.SET_USER:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          username: action.user.username,
          email: action.user.attributes.email,
          phone: action.user.attributes.phone_number
        }
      };
    case AuthActions.RESET_USER:
      return {
        ...state,
        userDetails: {
          ...initialAuthState.userDetails
        }
      };
    default:
      return state;
  }
}