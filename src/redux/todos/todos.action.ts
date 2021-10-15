import { Action } from 'redux';
import { Todo } from './todos.reducer';

export enum TodosActionsTypes {
  RESET = 'RESET_TODO',
  ADD = 'ADD_TODO',
  ADD_SUCCESS = 'ADD_TODO_SUCCESS',
  ADD_ERROR = 'ADD_TODO_ERROR',
  REMOVE = 'REMOVE_TODO',
  REMOVE_SUCCESS = 'REMOVE_TODO_SUCCESS',
  REMOVE_ERROR = 'REMOVE_TODO_ERROR',
  UPDATE = 'UPDATE_TODO',
  UPDATE_SUCCESS = 'UPDATE_TODO_SUCCESS',
  DONE = 'DONE_TODO',
  DONE_SUCCESS = 'DONE_TODO_SUCCESS',
  DONE_ERROR = 'DONE_TODO_ERROR',
  FETCH = 'FETCH_TODO',
  FETCH_SUCCESS = 'FETCH_TODO_SUCCESS',
  FETCH_ERROR = 'FETCH_TODO_ERROR'
}

export type ResetTodoAction = Action<TodosActionsTypes.RESET>;

export function resetTodos(): ResetTodoAction {
  return {
    type: TodosActionsTypes.RESET
  };
}

export interface FetchTodoAction extends Action<TodosActionsTypes.FETCH>{
  token: string;
}

export function fetchTodos(token: string): FetchTodoAction {
  return {
    type: TodosActionsTypes.FETCH,
    token
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
  token: string;
}

export function addTodo(title: string, description: string, done = false, token: string): AddTodoAction {
  return {
    type: TodosActionsTypes.ADD,
    title,
    description,
    done,
    token
  };
}

export interface AddTodoSuccessAction extends Action<TodosActionsTypes.ADD_SUCCESS>{
  todo: Todo
}

export function addTodoSuccess(todo: Todo): AddTodoSuccessAction {
  return {
    type: TodosActionsTypes.ADD_SUCCESS,
    todo
  };
}

export interface RemoveTodoAction extends Action<TodosActionsTypes.REMOVE> {
  id: string;
  token: string;
}
export function removeTodo(id: string, token: string): RemoveTodoAction {
  return {
    type: TodosActionsTypes.REMOVE,
    id,
    token
  };
}

export interface RemoveTodoSuccessAction extends Action<TodosActionsTypes.REMOVE_SUCCESS> {
  id: string;
  success: boolean;
}

export function removeTodoSuccess(id: string, success: boolean): RemoveTodoSuccessAction {
  return {
    type: TodosActionsTypes.REMOVE_SUCCESS,
    id,
    success
  };
}

export interface UpdateTodoAction extends Action<TodosActionsTypes.UPDATE> {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  token: string;
}

export function updateTodo(id: string, token: string, title: string, description?: string, done = false): UpdateTodoAction {
  return {
    type: TodosActionsTypes.UPDATE,
    id,
    title,
    description,
    done,
    token
  };
}

export interface UpdateTodoSuccessAction extends Action<TodosActionsTypes.UPDATE_SUCCESS> {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export function updateTodoSuccess(id: string, title: string, description: string, done: boolean): UpdateTodoSuccessAction {
  return {
    type: TodosActionsTypes.UPDATE_SUCCESS,
    id,
    title,
    description,
    done
  };
}
export interface DoneTodoAction extends Action<TodosActionsTypes.DONE> {
  id: string;
  token: string;
}

export function doneTodo(id: string, token: string): DoneTodoAction {
  return {
    type: TodosActionsTypes.DONE,
    id,
    token
  };
}

export interface DoneTodoSuccessAction extends Action<TodosActionsTypes.DONE_SUCCESS> {
  id: string;
}

export function doneTodoSuccess(id: string): DoneTodoSuccessAction {
  return {
    type: TodosActionsTypes.DONE_SUCCESS,
    id
  };
}

export type TodosAction =
  UpdateTodoAction |
  UpdateTodoSuccessAction |
  RemoveTodoAction |
  AddTodoAction |
  AddTodoSuccessAction |
  DoneTodoAction |
  DoneTodoSuccessAction |
  FetchTodoAction |
  FetchTodoSuccessAction |
  FetchTodoErrorAction |
  RemoveTodoAction |
  RemoveTodoSuccessAction |
  ResetTodoAction ;