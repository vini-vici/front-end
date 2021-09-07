import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

test('Testing1', async () => {
  expect(1).toBe(1);
});