import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { todosApi } from '@/redux/todos/todos';
import authReducer from '@/redux/auth/authSlice';
import { cognitoSlice } from '@/redux/cognito/cognito.thunk';

const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    auth: authReducer,
    cognito: cognitoSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todosApi.middleware),
  devTools: true
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;