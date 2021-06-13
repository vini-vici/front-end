import { combineReducers } from 'redux';
import { todosReducer } from './todos/todos.reducer';

const rootReducer = combineReducers({
  TodosState: todosReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;