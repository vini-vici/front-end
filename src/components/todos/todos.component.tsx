import React from 'react';

import TodoComponent from '@/components/todos/todo.component';
import { Todo } from '@/redux/todos/todos.reducer';
import Loading from '../loading/loading.component';
import Input from '@/components/input/input.component';
import styles from './todos.module.css';

interface TodosProps {
  loading: boolean;
  todos: Todo[];
  toggleDone(todoId: number): void;
  addTodo(todo: Todo): void;
}

export default function TodosComponent(props: TodosProps): React.ReactElement {
  const { todos, addTodo, toggleDone, loading = false } = props;

  const initialTodo: Todo = {
    id: -1,
    title: '',
    description: '',
    done: false
  };

  const [todo, setTodo] = React.useState(initialTodo);
  const [checked, setChecked] = React.useState(true);

  if(loading)
    return (
      <div className="flex flex-col justify-items-center items-center">
        <Loading />
      </div>
    );
  

  return (
    <div className="px-2">
      <header className="action-bar flex">
        <section>
          <label className="flex flex-col">
            <span className="font-semibold">Todo Title</span>
            <Input
              placeholder="Add a todo..."
              onChange={(e) => {
                setTodo({
                  ...todo,
                  title: e.target.value
                });
              }}
              value={todo.title}
            />
          </label>
        </section>
        <section>
          your mother
        </section>
        <section></section>
      </header>
      <div className="grid grid-cols-4">
        {/* Header Sections */}
        <div className={styles.header}>Title</div>
        <div className={styles.header}>Description</div>
        <div className={styles.header}>Done?</div>
        <div className={styles.header}>Actions</div>

        {
          todos.map(todo => <TodoComponent key={`todo-component-${todo.id}`} onDelete={() => console.log('hi jim')} {...todo} />)
        }
      </div>
    </div>
  );
}