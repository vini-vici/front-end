import { all, call } from 'redux-saga/effects';
import todosSagaWatcher from './todos/todos.saga';

/**
 * The root saga watches all the other sagas from each part of the codebase.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([
    call(todosSagaWatcher)
  ]);
}