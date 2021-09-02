/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, takeLatest, delay, takeEvery  } from 'redux-saga/effects';

import config from '@/config.json';
import { FetchTodoAction, TodosActionsTypes, fetchTodosSuccess, fetchTodosError, RemoveTodoAction, UpdateTodoAction } from './todos.action';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* fetchTodoSaga(_action: FetchTodoAction) {
  try {
    // meant to mimic a random API call failure.
    if (Math.round(Math.random() * 10) == 1) 
      throw Error('Async failed');
    
    // yield delay(1100);
    yield put(fetchTodosSuccess([
      {
        id: 1,
        title: 'Async!',
        description: 'loaded via async call.',
        done: false
      },
      {
        id: 2,
        title: 'Further Data',
        description: 'we definitely did the thing on this one.\nSomething Something dark side',
        done: true
      }
    ]));
    
  } catch (e) {
    yield put(fetchTodosError(e));
  }
}

export function* deleteTodoWatcher(action: RemoveTodoAction) {
  try {
    console.log(action.id, config);
    yield false;
  } catch (e) {
    console.error(e);
  }
}

export function* updateTodoWatcher(action: UpdateTodoAction) {
  try {
    console.log(action);
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