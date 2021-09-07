import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodosComponent from './todos.component';
import { RootState } from '@/redux/root.reducer';
import { doneTodo, fetchTodos, removeTodo, updateTodo } from '@/redux/todos/todos.action';
import useCognito from '@/hooks/cognito';

export default function TodosContainer(): React.ReactElement {
  // Map the todo state to the current object.
  const {todos, status} = useSelector(({ TodosState: {
    todos,
    status
  }}: RootState) => ({ todos, status}));

  const { user } = useCognito();

  // grab the dispatch.
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(status === 'initial') 
      dispatch(fetchTodos(user?.getSignInUserSession()?.getIdToken()?.getJwtToken()));
    
  }, [user?.getSignInUserSession()?.getIdToken()?.getJwtToken()]);

  // This function merely serves as a wrapper for the actual TodosComponent.
  return (
    <TodosComponent
      loading={!['success', 'error'].includes(status)}
      todos={todos}
      toggleDone={todoId => dispatch(doneTodo(todoId))}
      updateTodo={todo => dispatch(updateTodo(todo.id, todo.title, todo.description, todo.done))}
      deleteTodo={todo =>  dispatch(removeTodo('', todo))}
    />
  );
}