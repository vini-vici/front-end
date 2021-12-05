import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import Amplify from '@aws-amplify/core';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import config from '@/config.json';
// import { CLIENT_ID, COGNITO_DOMAIN, POOL_ID, REGION } from '@/config.json';

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
}


export const getUserThunk = createAsyncThunk<CognitoState>('cognito/fetchUser',
  async () => {
    const user = await Auth.currentAuthenticatedUser() as CognitoUser;
    const userDetails = await Auth.currentUserInfo();
    const signedIn = user.getSignInUserSession();
    return {
      username: user.getUsername(),
      prerredUsername: userDetails.attributes.preferredUsername,
      idToken: signedIn.getIdToken().getJwtToken(),
      accessToken: signedIn.getAccessToken().getJwtToken(),
      status: 'success',
      isLoading: false
    };
  }
);

export const signupUserThunk = createAsyncThunk<CognitoState, {
  username: string;
  password: string;
  email: string;
  preferredUsername?: string;
}>(
  'cognito/signupUser',
  async ({ username, preferredUsername, password, email }) => {
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

export const loginUserThunk = createAsyncThunk<CognitoState, UserLogin>('cognito/login',
  async action => {
    const user = await Auth.signIn(action.username, action.password);
    const userAttributes = await Auth.currentUserInfo();

    return {
      username: user.getUsername(),
      idToken: user.getSignInUserSession().getIdToken().getJwtToken(),
      accessToken: user.getSignInUserSession().getAccessToken().getJwtToken(),
      preferredUsername: userAttributes.attributes.preferredUsername,
      isLoading: false,
      status: 'success'
    };
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
    preferredUsername: ''
  } as CognitoState,
  reducers: {},
  extraReducers: builder => {

    // when the fetch user thunk is fulfilled
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken,
      state.preferredUsername = action.payload.preferredUsername;
      state.status = 'success';
      state.isLoading = false;
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

    builder.addMatcher((action: AnyAction) => (action.type as string).endsWith('/rejected'), state => {
      Object.assign(state, {
        isLoading: false,
        status: 'failure'
      });
    });
  }
});

export default cognitoSlice.reducer;