import React from 'react';

import Modal from '@/components/modal/modal.component';
import TodoComponent from '@/components/todos/todo.component';
import { Todo } from '@/redux/todos/todos.reducer';
import Checkbox from '@/components/checkbox/checkbox.component';

interface TodosProps {
  loading: boolean;
  todos: Todo[];
  toggleDone(todoId: number): void;
  addTodo(todo: Todo): void;
}

export default function TodosComponent(props: TodosProps) {
  const { todos, addTodo, toggleDone, loading = false } = props;

  const initialTodo: Todo = {
    id: -1,
    title: '',
    description: '',
    done: false
  }

  const [todo, setTodo] = React.useState(initialTodo);
  const [checked, setChecked] = React.useState(true);

  if(loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  return (
    <div>
      <div className="text-2xl">
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>
      {
        todos.map(todo => <TodoComponent key={`todo-component-${todo.id}`} {...todo} />)
      }
    </div>
  )
}