import React from 'react';

import TodoComponent from '@/components/todos/todo.component';
import { Todo } from '@/redux/todos/todos.reducer';
import Loading from '../loading/loading.component';
import styles from './todos.module.css';

interface TodosProps {
  loading: boolean;
  todos: Todo[];
  toggleDone(todoId: number): void;
  addTodo(todo: Todo): void;
  updateTodo(todo: Todo): void;
}

export default function TodosComponent(props: TodosProps): React.ReactElement {
  const { todos, loading = false, updateTodo } = props;

  if(loading)
    return (
      <div className="flex flex-col justify-items-center items-center">
        <Loading />
      </div>
    );
  

  return (
    <div className="px-2">
      <div className="grid grid-cols-4 gap-1">
        {/* Header Cells */}
        <div className={styles.header}>Done?</div>
        <div className={styles.header}>Title</div>
        <div className={styles.header}>Description</div>
        <div className={styles.header}>Actions</div>

        {
          todos.map(todo => (
            <TodoComponent
              key={`todo-component-${todo.id}`}
              onDelete={() => console.log('hi jim')}
              onChange={(e) => {
                updateTodo(e.detail);
              }}
              {...todo}
            />
          ))
        }
      </div>
    </div>
  );
}