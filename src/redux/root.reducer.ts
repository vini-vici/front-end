import { combineReducers } from 'redux';
import { todosReducer } from './todos/todos.reducer';
import createModalReducer from './createModal/createModal.reducer';

const rootReducer = combineReducers({
  TodosState: todosReducer,
  CreateModalState: createModalReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;