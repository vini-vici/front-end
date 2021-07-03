import { Action } from 'redux';
import { Todo } from './todos.reducer';

export enum TodosActionsTypes {
  ADD = 'ADD_TODO',
  REMOVE = 'REMOVE_TODO',
  UPDATE = 'UPDATE_TODO',
  DONE = 'DONE_TODO',
  FETCH = 'FETCH_TODO',
  FETCH_SUCCESS = 'FETCH_TODO_SUCCESS',
  FETCH_ERROR = 'FETCH_TODO_ERROR'
}

export type FetchTodoAction = Action<TodosActionsTypes.FETCH>;

export function fetchTodos(): FetchTodoAction {
  return {
    type: TodosActionsTypes.FETCH
  };
}

export interface FetchTodoSuccessAction extends Action<TodosActionsTypes.FETCH_SUCCESS> {
  todos: Todo[];
}
export function fetchTodosSuccess(todos: Todo[]): FetchTodoSuccessAction {
  return {
    type: TodosActionsTypes.FETCH_SUCCESS,
    todos
  };
}

export interface FetchTodoErrorAction extends Action<TodosActionsTypes.FETCH_ERROR> {
  error: Error;
}
export function fetchTodosError(error: Error): FetchTodoErrorAction {
  return {
    type: TodosActionsTypes.FETCH_ERROR,
    error
  };
}

export interface AddTodoAction extends Action<TodosActionsTypes.ADD> {
  title: string;
  description?: string;
  done: boolean;
}

export function addTodo(title: string, description: string, done = false): AddTodoAction {
  return {
    type: TodosActionsTypes.ADD,
    title,
    description,
    done
  };
}

export interface RemoveTodoAction extends Action<TodosActionsTypes.REMOVE> {
  title: string;
  id: number;
}
export function removeTodo(title: string, id: number = Number.MIN_SAFE_INTEGER): RemoveTodoAction {
  return {
    type: TodosActionsTypes.REMOVE,
    title,
    id
  };
}

export interface UpdateTodoAction extends Action<TodosActionsTypes.UPDATE> {
  id: number;
  title: string;
  description?: string;
  done: boolean;
}

export function updateTodo(id: number, title: string, description?: string, done = false): UpdateTodoAction {
  return {
    type: TodosActionsTypes.UPDATE,
    id,
    title,
    description,
    done
  };
}

export interface DoneTodoAction extends Action<TodosActionsTypes.DONE> {
  id: number;
}

export function doneTodo(id: number): DoneTodoAction {
  return {
    type: TodosActionsTypes.DONE,
    id
  };
}

export type TodosAction =
  UpdateTodoAction |
  RemoveTodoAction |
  AddTodoAction |
  DoneTodoAction |
  FetchTodoAction |
  FetchTodoSuccessAction |
  FetchTodoErrorAction;