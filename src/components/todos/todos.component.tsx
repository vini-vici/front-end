import React from 'react';

import Modal from '@/components/modal/modal.component';
import TodoComponent from '@/components/todos/todo.component';
import { Todo } from '@/redux/todos/todos.reducer';

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

  if(loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  return (
    <div>
      <Modal>
        Hello jim
      </Modal>
      {
        todos.map(todo => <TodoComponent key={`todo-component-${todo.id}`} {...todo} />)
      }
    </div>
  )
}