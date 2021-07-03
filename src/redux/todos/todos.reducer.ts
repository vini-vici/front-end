import { TodosAction, TodosActionsTypes } from './todos.action';

export interface Todo {
  id: number;
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
  todos: [
    {
      id: 1,
      title: 'Example Todo',
      description: 'You can add an optional description',
      done: false
    }
  ],
  todosById: {
    1: {
      id: 1,
      title: 'Example Todo',
      description: 'You can add an optional description',
      done: false
    }
  }
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
        }, {} as { [key: number]: Todo })
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

  // Adding a todo.
  case TodosActionsTypes.ADD:
    return {
      ...state,
      todos: [
        {
          id: state.todos.length + 1,
          title: action.title,
          description: action.description,
          done: action.done
        },
        ...state.todos
      ],
      todosById: {
        ...state.todosById,
        [state.todos.length + 1]: {
          id: state.todos.length + 1,
          title: action.title,
          description: action.description,
          done: action.done
        }
      }
    };

    // Removing a todo.
  case TodosActionsTypes.REMOVE: {
    const index = state.todos.findIndex((todo: Todo) => todo.title === action.title);
    if (index !== -1) {
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          ...state.todos.slice(index + 1)
        ],
        todosById: {
          ...state.todosById,
          [index]: undefined
        }
      };
    }
    break;
  }

  // marking a todo as done.
  // eslint-disable-next-line no-fallthrough
  case TodosActionsTypes.DONE: {
    const { id } = action;
    const itemIndex = state.todos.findIndex((todo) => todo.id === id);
    const todo = state.todos[itemIndex];
    const updatedTodo = {
      ...todo,
      done: !todo.done
    };
    return {
      ...state,
      todos: [
        ...state.todos.slice(0, itemIndex),
        updatedTodo,
        ...state.todos.slice(itemIndex + 1)
      ],
      todosById: {
        ...state.todosById,
        [id]: updatedTodo
      }
    };
  }
  // Updating a todo.
  case TodosActionsTypes.UPDATE: {
    const { id } = action;
    const newTodo = {
      ...action
    };
    const index = state.todos.findIndex(todo => todo.id === id);

    if (index !== -1)
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          newTodo,
          ...state.todos.slice(index + 1)
        ],
        todosById: {
          ...state.todosById,
          [id]: newTodo
        }
      };

    else return state;
  }
  // default.
  default:
    return state;
  }
}