import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  username: string;
  preferredUsername?: string;
  idToken: string;
  authToken: string;
}

const slice = createSlice({
  name: 'auth',
  initialState: { 
    user: null,
    token: null
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token }}: PayloadAction<{user: string; token: string}>
    ) => {
      state.user = user
      state.token = token
    }
  }
});

export const { setCredentials } = slice.actions;
export default slice.reducer;
export const selectCurrentUser =  (state: RootState) => state.auth.user;