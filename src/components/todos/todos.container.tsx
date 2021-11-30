import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import TodosComponent from './todos.component';
import useCognito from '@/hooks/cognito';
import { useGetTodosQuery } from '@/redux/todos/todos.api';

export default function TodosContainer(): React.ReactElement {
  // Map the todo state to the current object.
  
  const idToken = useSelector(({ cognito: { idToken } }: RootState) => idToken);

  // grab the dispatch.
  const dispatch = useDispatch();
  const { data: todos, isLoading } = useGetTodosQuery(undefined, {
    skip: idToken === ''
  });

  // This function merely serves as a wrapper for the actual TodosComponent.
  return (
    <TodosComponent
      loading={isLoading}
      todos={todos}
      toggleDone={todoId => void 0}
      updateTodo={todo => void 0}
      deleteTodo={todo =>  void 0}
    />
  );
}