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


export const getUserThunk = createAsyncThunk('cognito/fetchUser', 
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

type UserLogin = {
  username: string;
  password: string;
}

export const loginUserThunk = createAsyncThunk<{
  username: string;
  idToken: string;
  accessToken: string;
  preferredUsername?: string;
}, UserLogin>('cognito/login',
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
  async (_, { rejectWithValue }) => {
    try {
      await Auth.signOut({ global: true });
      return true;
    } catch(e) {
      rejectWithValue(e);
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
  },
  reducers: {},
  extraReducers: builder => {
    // when the fetch user thunk is fulfilled
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken,
      state.preferredUsername = action.payload.prerredUsername;
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
  }
});

export default cognitoSlice.reducer;
