import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { todosApi } from '@/redux/todos/todos.api';
import { cognitoSlice } from '@/redux/cognito/cognito.thunk';
import modalSlice from '@/redux/createModal/createModal.slice';


const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    cognito: cognitoSlice.reducer,
    modal: modalSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todosApi.middleware),
  devTools: true
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;