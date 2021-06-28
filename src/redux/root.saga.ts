import { all, call } from 'redux-saga/effects';
import todosSagaWatcher from './todos/todos.saga';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([
    call(todosSagaWatcher)
  ]);
}