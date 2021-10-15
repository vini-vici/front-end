import { TodosAction, TodosActionsTypes } from './todos.action';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  updating?: boolean;
}

export interface TodosState {
  status: 'initial' | 'loading' | 'success' | 'error';
  error: string;
  todos: Todo[];
  todosById: {
    [id: string]: Todo & { updating?: boolean };
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
    case TodosActionsTypes.RESET:
      return {
        ...initialState
      };
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

    case TodosActionsTypes.ADD_SUCCESS: {
      return {
        ...state,
        todos: [
          ...state.todos,
          action.todo
        ],
        todosById: {
          ...state.todosById,
          [action.todo.id]: {
            ...action.todo
          }
        }
      };
    }

    case TodosActionsTypes.UPDATE: {
      const ind = state.todos.findIndex(todo => todo.id === action.id);
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, ind),
          {
            ...state.todosById[action.id],
            id: action.id,
            title: action.title,
            done: action.done,
            description: action.description,
            updating: true
          },
          ...state.todos.slice(ind+1)
        ],
        todosById: {
          ...state.todosById,
          [action.id]: {
            ...state.todosById[action.id],
            title: action.title,
            description: action.description,
            done: action.done,
            updating: true
          }
        }
      };
    }

    case TodosActionsTypes.UPDATE_SUCCESS: {
      const { [action.id]: item } = state.todosById;
      const index = state.todos.findIndex(item => item.id === action.id);
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          {
            ...item,
            updating: false
          },
          ...state.todos.slice(index + 1)
        ],
        todosById: {
          ...state.todosById,
          [action.id]: {
            ...item,
            updating: false
          }
        }
      };
    }

    case TodosActionsTypes.DONE: {
      const index = state.todos.findIndex(todo => todo.id === action.id);
      const item = {
        ...state.todos[index],
        done: !state.todos[index].done
      };
      return {
        ...state,
        todosById: {
          ...state.todosById,
          [action.id]: {
            ...item,
            updating: true
          }
        }
      };
    }

    case TodosActionsTypes.DONE_SUCCESS: {
      const index = state.todos.findIndex(todo => todo.id === action.id);
      if(!index) return state;
      const item = {
        ...state.todos[index]
      };
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          item,
        ],
        todosById:{
          ...state.todosById,
          [action.id]: {
            ...item,
            updating: false
          }
        }
      };
    }

    case TodosActionsTypes.REMOVE: {
      return {
        ...state,
        todos: state.todos.filter(item =>  item.id !== action.id),
        todosById: {
          ...state.todosById,
          [action.id]: undefined
        }
      };
    }
    //
    default:
      return state;
  }
}