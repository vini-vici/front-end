import React from 'react';
import { Todo } from '@/redux/todos/todos.reducer';
import Input from '@/components/input/input.component';
import Textarea from '@/components/textarea/textarea.component';
import Checkbox from '@/components/checkbox/checkbox.component';

export interface TodoProps extends Todo {
  onDelete: (todoId: number) => void;
  onChange?: (e: CustomEvent<Todo>) => void;
}

export default function TodoComponent(
  {
    title,
    description,
    id,
    done,
    onDelete,
    onChange
  }: TodoProps
): React.ReactElement {

  const [isEditing, setEditing] = React.useState(false);

  return (
    <>
      <div className="border-l p-2 text-center">
        <div className="mx-auto">
          <Checkbox
            checked={done}
            onChange={({ target }) => {
              onChange(
                new CustomEvent('updateTodo', {
                  detail: {
                    done: target.checked,
                    title,
                    description,
                    id
                  } as Todo
                })
              );
            }}
          />
        </div>
      </div>

      <div>
        {
          isEditing ? 
            (
              <Input
                value={title}
                onChange={({ target }) => onChange(
                  new CustomEvent('updateTodo', {
                    detail: {
                      id,
                      done,
                      description,
                      title: target.value
                    } as Todo
                  })
                )}
              />
            ):
            title
        }
      </div>
      <div className="border-l p-2">
        {
          isEditing ?
            (
              <Textarea
                value={description}
                onChange={({ target }) => onChange(
                  new CustomEvent('updateTodo', {
                    detail: {
                      id,
                      done,
                      title,
                      description: target.value
                    } as Todo
                  })
                )}
              />
            ) :
            description
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