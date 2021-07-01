import { all, call } from 'redux-saga/effects';
import todosSagaWatcher from './todos/todos.saga';

export default function* rootSaga() {
  yield all([
    call(todosSagaWatcher)
  ]);
}