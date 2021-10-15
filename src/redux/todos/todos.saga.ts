/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';

import { FetchTodoAction, TodosActionsTypes, fetchTodosSuccess, fetchTodosError, RemoveTodoAction, UpdateTodoAction, removeTodoSuccess, AddTodoAction, addTodoSuccess, DoneTodoAction, updateTodoSuccess, doneTodoSuccess } from './todos.action';
import { listTodos, deleteTodo, addTodo, updateTodo } from '@/api/api';
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

export function* updateTodoWatcher({ id, title, description, done, token }: UpdateTodoAction) {
  try {
    const response = (yield call(updateTodo, id, {
      title,
      description,
      done
    }, token)) as Todo;
    
    yield put(updateTodoSuccess(
      id,
      title,
      description,
      done
    ));
    // Add success line
  } catch (e) {
    console.error(e);
    // Add error line.
  }
}

export function* addTodoWatcher({ title, done, description, token }: AddTodoAction) {
  try {
    const {id} = (yield call(addTodo, {
      title,
      done,
      description
    }, token)) as {id: string};

    yield put(addTodoSuccess({
      id,
      title,
      done, 
      description
    }));

  } catch(e) {
    console.error(e);
  }
}

export function* doneTodoWatcher(action: DoneTodoAction) {
  try {
    const res = (yield call(updateTodo, action.id, {
      done: true
    }, action.token)) as Todo;
    yield put(doneTodoSuccess(action.id));
  } catch(e) {
    console.error(e);
  }
}

export default function* todoSagaWatcher() {
  yield takeLatest(TodosActionsTypes.FETCH, fetchTodoSaga);
  yield takeEvery(TodosActionsTypes.REMOVE, deleteTodoWatcher);
  yield takeEvery(TodosActionsTypes.UPDATE, updateTodoWatcher);
  yield takeEvery(TodosActionsTypes.ADD, addTodoWatcher);
  yield takeEvery(TodosActionsTypes.DONE, doneTodoWatcher);
}