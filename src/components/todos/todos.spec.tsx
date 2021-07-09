import React from 'react';
import { render, screen, fireEvent, logDOM } from '@testing-library/react';
import TodosComponent from './todos.component';
import { Todo } from '@/redux/todos/todos.reducer';

const todos: Todo[] = [
  {
    id: 1,
    title: 'First todo',
    description: '',
    done: false
  },
  {
    id: 2,
    title: 'Second todo',
    description: 'with optional description',
    done: true
  }
];

test('Render loading state', async () => {
  const toggleDone = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  
  render(
    <TodosComponent
      loading={true}
      toggleDone={toggleDone}
      todos={todos}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
    />
  );

  screen.getByText('Loading...');
});


test('Render with no initial items', async () => {
  const toggleDone = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const { rerender, container } = render(
    <TodosComponent
      loading={false}
      todos={[]}
      toggleDone={toggleDone}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
    />
  );
  // Expect the no rows to item to be visible.
  expect(
    container.querySelector('.todos-list .no-todos')
  ).not.toBeNull();

  rerender(
    <TodosComponent
      loading={false}
      todos={todos}
      toggleDone={toggleDone}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
    />
  );

  expect(
    container.querySelector('.todos-list .no-todos')
  ).toBeNull();

  expect(
    container.querySelectorAll('.todos-list .todo-row')
      .length
  ).toBe(2);
});

test('Trigger Edit', async () => {
  const toggleDone = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const { container } = render(
    <TodosComponent
      todos={todos}
      loading={false}
      toggleDone={toggleDone}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
    />
  );
  // Grab the node
  const row = screen.getByText(todos[0].title).parentElement;
  expect(
    row.lastElementChild.querySelector('span.text-blue-500')
  ).not.toBeNull();
  fireEvent.click(row.lastElementChild.querySelector('span.text-blue-500'));
  const el = screen.getByDisplayValue(todos[0].title);
  expect(el.tagName.toLowerCase()).toBe('input');
  fireEvent.change(el,{
    target: {
      value: 'New Title'
    }
  });

  fireEvent.click(
    row.lastElementChild.querySelector('button')
  );
  expect(updateTodo).toHaveBeenCalled();
});

test('Removes todos correctly', async () => {
  const toggleDone = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const { container } = render(
    <TodosComponent
      loading={false}
      todos={todos}
      toggleDone={toggleDone}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
    />
  );

  fireEvent.click(
    container.querySelector('.todo-row').lastElementChild.lastElementChild
  );

  expect(deleteTodo).toHaveBeenCalled();
  
});