import React from 'react';
import { Todo } from '@/redux/todos/todos.reducer';
import styles from './todos.module.css';



export interface TodoProps extends Todo {}
export default function TodoComponent(props: TodoProps) {
  const { title, description, id, done } = props;

  const [isEditing, setEditing] = React.useState(true);

  return (
    <div className={"todo flex justify-between px-3 border"}>
      <div>
        {title}
      </div>
      <div>
        {description}
      </div>
      <div>
        { 
          done 
          ? 'Done'
          : 'Not Done'
        }
      </div>
      <div className="flex justify-center">
        <div>
          Edit
        </div>
        <div>
          Delete
        </div>
      </div>
    </div>
  );
}