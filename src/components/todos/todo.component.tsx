import { Todo } from '@/redux/todos/todos.reducer';
import React from 'react';

export interface TodoProps extends Todo {}
export default function TodoComponent(props: TodoProps) {
  const { title, description, id, done } = props;

  const [isEditing, setEditing] = React.useState(true);

  return (
    <div className="todo flex justify-between px-3 border" onDoubleClick={(e) => console.log(e.target)}>
      <div>
        {title}
      </div>
      <div>
        {description}
      </div>
      <div>
        {done ? 'Done' : 'Not Done'}
      </div>
    </div>
  );
}