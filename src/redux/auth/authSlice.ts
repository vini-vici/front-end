import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthState {
  username: string;
  preferredUsername?: string;
  idToken: string;
  authToken: string;
}

const slice = createSlice({
  name: 'auth',
  initialState: { 
    username: '',
    idToken: '',
    authToken: ''
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { username, idToken, authToken, preferredUsername } }: PayloadAction<AuthState>
    ) => ({
      ...state,
      username,
      preferredUsername,
      idToken,
      authToken
    }),
  }
});

export const { setCredentials } = slice.actions;
export default slice.reducer;
export const selectCurrentUser =  (state: RootState) => state.auth.username;