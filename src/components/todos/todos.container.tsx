import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodosComponent from './todos.component';
import { RootState } from '@/redux/root.reducer';
import { addTodo, doneTodo, fetchTodos } from '@/redux/todos/todos.action';

export default function TodosContainer() {
  // Map the todo state to the current object.
  const {todos, status} = useSelector(({ TodosState: {
    todos,
    status
  }}: RootState) => ({ todos, status}));

  // grab the dispatch.
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(status === 'initial') {
      dispatch(fetchTodos());
    }
  }, []);

  // This function merely serves as a wrapper for the actual TodosComponent.
  return (
    <TodosComponent
      loading={!['success', 'error'].includes(status)}
      todos={todos}
      toggleDone={(todoId) => dispatch(doneTodo(todoId))}
      addTodo={(todo) => dispatch(addTodo(todo.title, todo.description, todo.done))}
    />
  )
}