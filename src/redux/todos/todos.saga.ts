import { all, call, put, takeLatest } from 'redux-saga/effects';

import { FetchTodoAction, fetchTodos, TodosActionsTypes } from './todos.action';

export function* todosSaga(action: FetchTodoAction) {
	try {
		if (Math.round(Math.random() * 10) == 1) {
			throw Error('Async failed');
		}
		setTimeout(() => {
			put({
				type: TodosActionsTypes.FETCH_SUCCESS,
				todos: []
			})
		}, 1100);
	} catch (e) {
		put({
			type: TodosActionsTypes.FETCH_ERROR,
			error: {
				response: 500,
				message: 'fucky wucky'
			}
		});
	}
}
