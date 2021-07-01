import { all, call, put, takeLatest, delay } from 'redux-saga/effects';

import { FetchTodoAction, TodosActionsTypes, fetchTodosSuccess, fetchTodosError } from './todos.action';

export function* fetchTodoSaga(action: FetchTodoAction) {
  try {
    if (Math.round(Math.random() * 10) == 1) {
      throw Error('Async failed');
    }
    yield delay(1100);
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
        description: 'we definitely did the thing on this one.',
        done: true
      }
    ]));
  } catch (e) {
    yield put(fetchTodosError(e));
  }
}

export default function* todoSagaWatcher() {
  yield takeLatest(TodosActionsTypes.FETCH, fetchTodoSaga);
}