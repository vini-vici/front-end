import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import TodosComponent from './todos.component';
import { useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '@/redux/todos/todos.api';

export default function TodosContainer(): React.ReactElement {
  // Map the todo state to the current object.
  
  const idToken = useSelector(({ cognito: { idToken } }: RootState) => idToken);

  // grab the dispatch.
  const { data: todos, isLoading } = useGetTodosQuery(undefined, {
    skip: idToken === '',
  });

  const [updateTodo, { isSuccess, isLoading: updateLoading, isError: addError }] = useUpdateTodoMutation();
  const [deleteTodo, { isSuccess: deleteSuccess, isLoading: deleteLoading, isError: deleteError }] = useDeleteTodoMutation();

  // This function merely serves as a wrapper for the actual TodosComponent.
  return (
    <TodosComponent
      loading={isLoading}
      todos={todos}
      toggleDone={todoId => idToken && updateTodo({ id: todoId, done: !todos.find(v => v.id === todoId).done })}
      updateTodo={todo => idToken && updateTodo(todo)}
      deleteTodo={todo =>  idToken && deleteTodo(todo)}
    />
  );
}