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
  const token = user?.getSignInUserSession()?.getIdToken()?.getJwtToken();

  // grab the dispatch.
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(status === 'initial' && token?.length > 0)
      dispatch(fetchTodos(user?.getSignInUserSession()?.getIdToken()?.getJwtToken()));
    
  }, [token]);

  // This function merely serves as a wrapper for the actual TodosComponent.
  return (
    <TodosComponent
      loading={!['success', 'error'].includes(status)}
      todos={todos}
      toggleDone={todoId => dispatch(doneTodo(todoId, token))}
      updateTodo={todo => dispatch(updateTodo(todo.id, token, todo.title, todo.description, todo.done))}
      deleteTodo={todo =>  dispatch(removeTodo(todo, token))}
    />
  );
}