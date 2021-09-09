/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';

import { FetchTodoAction, TodosActionsTypes, fetchTodosSuccess, fetchTodosError, RemoveTodoAction, UpdateTodoAction, removeTodoSuccess } from './todos.action';
import { listTodos, deleteTodo } from '@/api/api';
import { Todo } from './todos.reducer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* fetchTodoSaga(action: FetchTodoAction) {
  try {
    
    const response = (yield call(listTodos, action.token)) as Todo[];
    yield put(fetchTodosSuccess(response));
    
  } catch (e) {
    console.error(e);
    yield put(fetchTodosError(e));
  }
}

export function* deleteTodoWatcher(action: RemoveTodoAction) {
  try {
    const response = (yield call(deleteTodo, action.id, action.token)) as boolean;

    yield put(removeTodoSuccess(action.id, response as boolean));
    
  } catch (e) {
    console.error(e);
  }
}

export function* updateTodoWatcher(action: UpdateTodoAction) {
  try {
    // 
    yield false;
  } catch (e) {
    console.error(e);
  }
}

export default function* todoSagaWatcher() {
  yield takeLatest(TodosActionsTypes.FETCH, fetchTodoSaga);
  yield takeEvery(TodosActionsTypes.REMOVE, deleteTodoWatcher);
  yield takeEvery(TodosActionsTypes.UPDATE, updateTodoWatcher);
}