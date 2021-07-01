import React from 'react';
import { render, screen } from '@testing-library/react';
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
  // const initTodos: Todo[] = [];
  const addTodo = jest.fn();
  const toggleDone = jest.fn();
  render(
    <TodosComponent
      loading={true}
      addTodo={addTodo}
      toggleDone={toggleDone}
      todos={todos}
    />
  );

  screen.getByText('Loading...');
});

// test('Render with no initial items', async () => {
//   const initTodos: Todo[] = [];

//   const addTodo = jest.fn((t: Todo) => initTodos.push({ ... t, id: initTodos.length + 1}));
//   const toggleDone = jest.fn();

//   const wrapper = render(
//     <TodosComponent
//       loading={false}
//       addTodo={addTodo}
//       toggleDone={toggleDone}
//       todos={initTodos}
//     />);

//   // Check to make sure nothing ahs changed about this that we don't expect.
//   expect(
//     wrapper.container.querySelectorAll('thead tr').length
//   ).toBe(3);

//   // We do not have any items displayed in the body.
//   expect(
//     wrapper.container.querySelectorAll('tbody tr').length
//   ).toBe(0);

//   // Let's add one.
//   fireEvent.change(
//     wrapper.container.querySelector('#todo-title'),
//     {
//       target: {
//         value: 'Added'
//       }
//     }
//   );

//   expect(
//     (wrapper.container.querySelector('#todo-title') as HTMLInputElement).value
//   ).toBe('Added');
  
//   fireEvent.click(wrapper.container.querySelector('thead button'));

//   expect(
//     addTodo
//   ).toHaveBeenCalled();

//   expect(
//     wrapper.container.querySelector('tbody tr td:nth-child(1)').textContent
//   ).toContain('Added')

//   expect(wrapper.container.querySelector('tbody tr td:nth-child(3)').textContent)
//   .toContain('Not Done');

//   fireEvent.click(
//     wrapper.container.querySelector('tbody tr')
//   );

//   expect(
//     toggleDone
//   ).toHaveBeenCalledTimes(1);

// });

// test('Render with some todos.', async () => {
//   const addTodo = jest.fn((t:Todo) => {
//     todos.push({
//       ...t,
//       id: todos.length + 1
//     });
//   });
//   const toggleDone = jest.fn();
//   const wrapper = render(
//     <TodosComponent
//       loading={false}
//       addTodo={addTodo}
//       toggleDone={toggleDone}
//       todos={todos}
//     />
//   );
  
//   // Make sure the rows are displaying correctly.
//   wrapper.container.querySelectorAll('tbody tr').forEach((row, index) => {
//     expect(
//       row.querySelector('td:nth-child(1)').textContent
//     ).toBe(todos[index].title);
//     if(todos[index].done) {
//       expect(row.classList.contains('todo--done')).toBe(true);
//       expect(row.querySelector('td:nth-child(3)').textContent).toBe('Done');
//     } else {
//       expect(row.classList.contains('todo--done')).toBe(false);
//       expect(row.querySelector('td:nth-child(3)').textContent).toBe('Not Done');
//     }
//   });

//   // Fire the change event, making the target value "Added"
//   fireEvent.change(
//     wrapper.container.querySelector('#todo-title'),
//     {
//       target: {
//         value: 'Added'
//       }
//     }
//   );

//   // Similar to above, but making it "Description"
//   fireEvent.change(
//     wrapper.container.querySelector('#todo-description'),
//     {
//       target: {
//         value: 'Description'
//       }
//     }
//   );

//   // This is a todo we have already done.
//   fireEvent.click(
//     wrapper.container.querySelector('thead input[type="checkbox"]')
//   );

//   // Ensure our values have been updated correctly...
//   expect(
//     (wrapper.container.querySelector('#todo-title') as HTMLInputElement).value
//   ).toBe('Added');
//   expect(
//     (wrapper.container.querySelector('#todo-description') as HTMLInputElement).value
//   ).toBe('Description');
//   expect(
//     (wrapper.container.querySelector('thead input[type="checkbox"]') as HTMLInputElement).checked
//   ).toBe(true);

//   // Click the "Add" button
//   fireEvent.click(
//     wrapper.container.querySelector('thead button')
//   );

//   expect(
//     addTodo
//   ).toHaveBeenCalledTimes(1);

//   expect(
//     (wrapper.container.querySelector('#todo-title') as HTMLInputElement).value
//   ).toBe('');
  
//   expect(
//     wrapper.container.querySelectorAll('tbody tr').length
//   ).toBe(3);
// });