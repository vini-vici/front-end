import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Amplify from '@aws-amplify/core';
import Auth, { CognitoUser } from '@aws-amplify/auth';

import { CLIENT_ID, COGNITO_DOMAIN, POOL_ID, REGION } from '@/config.json';

// Q: How do we do this without needing to hardcode the values for the 
Amplify.configure({
  Auth: {
    region: REGION,
    userPoolId: POOL_ID,
    userPoolWebClientId: CLIENT_ID,
    oauth: {
      domain: COGNITO_DOMAIN,
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
}


export const getUserThunk = createAsyncThunk<CognitoState>('cognito/fetchUser', 
  async () => {
    const user = await Auth.currentAuthenticatedUser() as CognitoUser;
    const userDetails = await Auth.currentUserInfo();
    const signedIn = user.getSignInUserSession();
    return {
      username: user.getUsername(),
      prerredUsername: userDetails.attributes.preferredUsername,
      idToken:signedIn.getIdToken().getJwtToken(),
      accessToken: signedIn.getAccessToken().getJwtToken()
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
  async ({ username, preferredUsername, password, email }, { getState }) => {
    const state = getState();
    console.log(state);
    const newUser = await Auth.signUp({
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
      idToken: newUser.user.getSignInUserSession().getIdToken().getJwtToken(),
      accessToken: newUser.user.getSignInUserSession().getAccessToken().getJwtToken()
    };
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
    };
  }
);

export const logoutUserThunk = createAsyncThunk(
  'cognito/logout',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      await Auth.signOut({ global: true });
      await fulfillWithValue(true);
    } catch(e) {
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
    });
    
    // When logging a user in is fulfilled.
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
      state.preferredUsername = action.payload.preferredUsername;
    });

    // When this is fulfilled.
    builder.addCase(logoutUserThunk.fulfilled, state => {
      state.username = '';
      state.idToken = '';
      state.accessToken = '';
      state.preferredUsername = '';
    });

    builder.addCase(signupUserThunk.fulfilled, state => {
      state.username = '';
      state.idToken = '';
      state.accessToken = '';
      state.preferredUsername = '';
    });
  }
});

export default cognitoSlice.reducer;