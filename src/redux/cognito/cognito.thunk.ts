import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import Amplify from '@aws-amplify/core';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import config from '@/config.json';
import { RootState } from '../store';

// Q: How do we do this without needing to hardcode the values for the 
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

interface CognitoState {
  username: string;
  idToken: string;
  accessToken: string;
  preferredUsername?: string;
  needsVerification?: boolean;
  status: 'pending' | 'success' | 'failure';
  isLoading: boolean;
  error?: string;
}


export const getUserThunk = createAsyncThunk<CognitoState>('cognito/fetchUser',
  async () => {
    const user = await Auth.currentAuthenticatedUser() as CognitoUser;
    const userDetails = await Auth.currentUserInfo();
    const signedIn = user.getSignInUserSession();
    return {
      username: user.getUsername(),
      preferredUsername: userDetails.attributes.preferred_username,
      idToken: signedIn.getIdToken().getJwtToken(),
      accessToken: signedIn.getAccessToken().getJwtToken(),
      status: 'success',
      isLoading: false
    };
  }
);

export const signupUserThunk = createAsyncThunk<Partial<CognitoState>, {
  username: string;
  password: string;
  email: string;
  preferredUsername?: string;
}>(
  'cognito/signupUser',
  async ({ username, preferredUsername, password, email }, { rejectWithValue }) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          preferred_username: preferredUsername
        }
      });
  
      return {
        username,
        preferredUsername,
        email,
        needsVerification: true,
        idToken: '',
        accessToken: '',
        status: 'success',
        isLoading: false
      };

    } catch(e) {
      const error = e as Error;
      if(error.name === 'UsernameExistsException') {
        return rejectWithValue({
          error: 'Username is already taken'
        });
      }

      if(error.name === 'InvalidPasswordException') {
        return rejectWithValue({
          error: 'Invalid password'
        });
      }
      return rejectWithValue({});
    }
  }
);

export const verifyUserThunk = createAsyncThunk<Record<string, never>, { code: string; password: string;  }>(
  'cognito/verifyUser',
  async ({ code, password }, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as RootState;
    const v = await Auth.confirmSignUp(state.cognito.username, code);

    if (v === 'SUCCESS') {
      dispatch(loginUserThunk({
        username: state.cognito.username,
        password
      }));
    } else
      rejectWithValue(false);

    return {};
  }
);

type UserLogin = {
  username: string;
  password: string;
}

export const loginUserThunk = createAsyncThunk<Partial<CognitoState>, UserLogin>('cognito/login',
  async (action, { rejectWithValue }) => {
    try {
      const user = await Auth.signIn(action.username, action.password);
      const userAttributes = await Auth.currentUserInfo();
  
      return {
        username: user.getUsername(),
        idToken: user.getSignInUserSession().getIdToken().getJwtToken(),
        accessToken: user.getSignInUserSession().getAccessToken().getJwtToken(),
        preferredUsername: userAttributes.attributes.preferred_username,
        isLoading: false,
        status: 'success'
      };
    } catch(e: unknown) {
      const error = e as Error;
      if(error.name === 'UserNotFoundException' || error.name === 'NotAuthorizedException') {
        console.log('fail this bitch RIGHT NOW');
        return rejectWithValue({
          error: 'Your username or password is incorrect. Please check the values and try again.' //i18n.t('Login.validation-error')
        } as Partial<CognitoState>);
      }
      
      return rejectWithValue({
        idToken: '',
        accessToken: '',
        username: '',
        status: 'failure',
        isLoading: false,
        error: 'Something has gone wrong trying to login. Please wait for one minute and try again.'
      } as Partial<CognitoState>);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'cognito/logout',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      await Auth.signOut({ global: true });
      await fulfillWithValue(true);
    } catch (e) {
      await rejectWithValue(e);
    }
  }
);

export const cognitoSlice = createSlice({
  name: 'cognito',
  initialState: {
    username: '',
    idToken: '',
    accessToken: '',
    preferredUsername: '',
    isLoading: false,
    status: 'pending',
    error: '',
    needsVerification: false
  } as CognitoState,
  reducers: {},
  extraReducers: builder => {

    // when the fetch user thunk is fulfilled
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      console.log(action);
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken,
      state.preferredUsername = action.payload.preferredUsername;
      state.status = 'success';
      state.isLoading = false;
    });

    builder.addCase(loginUserThunk.pending, state => {
      state.error = '';
    });
    // When logging a user in is fulfilled.
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
      state.preferredUsername = action.payload.preferredUsername;
      state.status = 'success';
      state.isLoading = false;
    });

    // When this is fulfilled.
    builder.addCase(logoutUserThunk.fulfilled, state => {
      state.username = '';
      state.idToken = '';
      state.accessToken = '';
      state.preferredUsername = '';
      state.status = 'success';
      state.isLoading = false;
    });

    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.idToken = '';
      state.accessToken = '';
      state.preferredUsername = action.payload.preferredUsername;
      state.needsVerification = true;
      state.status = 'success';
      state.isLoading = false;
    });

    builder.addCase(verifyUserThunk.fulfilled, state => {
      state.needsVerification = false;
    });
    // Add matcher for the loading tasks
    builder.addMatcher((action: AnyAction) => (action.type as string).endsWith('/pending'), state => {
      Object.assign(state, {
        isLoading: true,
        status: 'loading'
      });
    });

    builder.addMatcher((action: AnyAction) => (action.type as string).endsWith('/rejected'), (state, action) => {
      Object.assign(state, {
        isLoading: false,
        status: 'failure',
        error: action?.payload?.error || ''
      });
    });
  }
});

export default cognitoSlice.reducer;