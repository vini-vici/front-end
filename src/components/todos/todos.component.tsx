import React from 'react';

import TodoComponent from '@/components/todos/todo.component';
import { Todo } from '@/redux/todos/todos.reducer';

interface TodosProps {
  todos: Todo[];
  toggleDone(todoId: number): void;
  addTodo(todo: Todo): void;
}

export default function TodosComponent(props: TodosProps) {
  const { todos, addTodo, toggleDone } = props;

  const initialTodo: Todo = {
    id: -1,
    title: '',
    description: '',
    done: false
  }

  const [todo, setTodo] = React.useState(initialTodo);

  return (
    <div>
      {todos.map(todo => <TodoComponent {...todo} />)}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Done?</th>
          </tr>
          <tr>
            <td>
              <input
                id="todo-title"
                className="p-2 border rounded w-full"
                type="text"
                placeholder="Set Dinner"
                value={todo.title}
                onChange={({target}) => setTodo({...todo, title: target.value})}
              />
            </td>
            <td>
              <input
                id="todo-description"
                className="p-2 border rounded w-full"
                type="text"
                placeholder="Macaroni... and the chicken strips"
                value={todo.description}
                onChange={({target}) => setTodo({...todo, description: target.value })}
              />
            </td>
            <td className="text-center">
              <input
                id="todo-done"
                className="mx-auto"
                type="checkbox"
                checked={todo.done}
                onChange={({target}) => setTodo({...todo, done: target.checked})}
              />
            </td>
          </tr>
          <tr>
            <td className="text-center py-2" colSpan={3}>
              <button className="px-2 py-1 rounded bg-indigo-700 text-gray-200" onClick={() => {
                addTodo(todo);
                setTodo(initialTodo);
              }}>Add</button>
            </td>
          </tr>
        </thead> 
        <tbody>
          {
            todos.map(({ id, title, description, done}) => (
              <tr
                key={`todo-${id}-${title}`}
                className={done ? "todo--done border" : "border"}
                onClick={() => toggleDone(id)}
              >
                <td className="border p-3">{title}</td>
                <td className="border p-3">{description}</td>
                <td className="p-3">
                  {
                    done
                    ? 'Done'
                    : 'Not Done'
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}