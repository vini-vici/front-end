import React from 'react';

import TodoComponent from '@/components/todos/todo.component';
import { Todo } from '@/redux/todos/todos.reducer';
import Loading from '@vini-vici/viddi/dist/loading/loading.component';
import styles from './todos.module.css';

interface TodosProps {
  loading: boolean;
  todos: Todo[];
  toggleDone(todoId: string): void;
  deleteTodo(todoId: string): void;
  updateTodo(todo: Todo): void;
}

export default function TodosComponent(props: TodosProps): React.ReactElement {
  const { todos, loading = false, updateTodo, deleteTodo } = props;

  if(loading) {
    return (
      <div className="flex flex-col justify-items-center items-center">
        <Loading />
      </div>
    );
  }
  

  return (
    <div className="todos-list px-2">
      <div className="grid grid-cols-4 gap-1">
        {/* Header Cells */}
        <div className={styles.header}>Done?</div>
        <div className={styles.header}>Title</div>
        <div className={styles.header}>Description</div>
        <div className={styles.header}>Actions</div>

        {
          todos.length ?
            todos.map(todo => (
              <TodoComponent
                key={`todo-component-${todo.id}`}
                onDelete={todo => deleteTodo(todo)}
                onChange={e => {
                  updateTodo(e.detail);
                }}
                onDone={e => {
                  updateTodo(e.detail);
                }}
                {...todo}
              />
            )) :
            <div className="no-todos col-span-4 text-center py-3">
              There are no todos. Please click on the pen icon in the top right to add one!
            </div>
        }
      </div>
    </div>
  );
}