import { combineReducers } from 'redux';
import { todosReducer } from './todos/todos.reducer';
import createModalReducer from './createModal/createModal.reducer';
import AuthReducer from './auth/auth.reducer';

const rootReducer = combineReducers({
  TodosState: todosReducer,
  CreateModalState: createModalReducer,
  AuthState: AuthReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;