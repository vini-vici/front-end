import { TodosAction, TodosActionsTypes } from './todos.action';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  done: boolean;
}

export interface TodosState {
  status: 'initial' | 'loading' | 'success' | 'error';
  error: string;
  todos: Todo[];
  todosById: {
    [id: number]: Todo;
  };
}

const initialState: TodosState = {
  status: 'initial',
  error: '',
  todos: [],
  todosById: {}
};

export function todosReducer(state: TodosState = initialState, action: TodosAction): TodosState {
  switch (action.type) {
  // fetch status
    case TodosActionsTypes.FETCH:
      return {
        ...state,
        status: 'loading'
      };

    // Successfully fetched items, meaning we need to set both the 
    // todos array and the todosById.
    case TodosActionsTypes.FETCH_SUCCESS: {
      return {
        ...state,
        status: 'success',
        todos: [
          ...action.todos
        ],
        todosById: {
          ...action.todos.reduce((cum, cur) => {
            cum[cur.id] = cur;
            return cum;
          }, {} as { [key: string]: Todo })
        }
      };
    }
    // We had an error in trying to fetch.
    case TodosActionsTypes.FETCH_ERROR: {
      return {
        ...state,
        status: 'error',
        error: action.error.message
      };
    }

    //
    default:
      return state;
  }
}