import React from 'react';
import { Todo } from '@/redux/todos/todos.reducer';
import Input from '@/components/input/input.component';
import Textarea from '@/components/textarea/textarea.component';

export interface TodoProps extends Todo {
  onDelete: (todoId: number) => void;
}

export default function TodoComponent(props: TodoProps): React.ReactElement {
  const { title, description, id, done, onDelete } = props;

  const [isEditing, setEditing] = React.useState(false);

  return (
    <>
      <div>
        {
          isEditing ? 
            (<Input value={title} /> ):
            title
        }
      </div>
      <div className="border-l p-2">
        {
          isEditing ?
            (
              <Textarea
                value={description}
              />
            ) :
            description
        }
      </div>
      <div className="border-l p-2">
        {
          isEditing ?
            <input type="checkbox" checked={done} /> :
            (done ? 'Done' : 'Not done')
        }
      </div>
      <div className="flex justify-evenly">
        <div onClick={() => setEditing(!isEditing)}>
          {
            isEditing
              ? (<button className="bg-purple-500 text-gray-100 px-2 py-1 rounded">Save</button>)
              : (<span className="text-blue-500">Edit</span>)
          }
        </div>
        <div onClick={() => onDelete(id)}>
          Delete
        </div>
      </div>
    </>
  );
}