import React from 'react';
import { Todo } from '@/redux/todos/todos.api';
import Input from '@vini-vici/viddi/dist/input/input.component';
import Textarea from '@vini-vici/viddi/dist/textarea/textarea.component';
import Checkbox from '@vini-vici/viddi/dist/checkbox/checkbox.component';
import Button from '@vini-vici/viddi/dist/button/button.component';
import Dc from '@vini-vici/viddi/dist/classes/domClasses.class';

export interface TodoProps extends Todo {
  onDelete: (todoId: string) => void;
  onChange?: (e: CustomEvent<Todo>) => void;
  onDone?: (e: CustomEvent<Todo>) => void;
}

export default function TodoComponent(
  {
    title,
    description,
    id,
    done,
    onDelete,
    onChange,
    onDone,
  }: TodoProps
): React.ReactElement {

  const [isEditing, setEditing] = React.useState(false);
  const [local, setLocal] = React.useState({
    title,
    description
  });

  const rowClasses = new Dc('todo-row contents');

  return (
    <div className={rowClasses.toString()}>
      <div className="border-l p-2 text-center">
        <div className="mx-auto">
          <Checkbox
            checked={done}
            onChange={({ target }) => {
              onDone(new CustomEvent('TodoDone', {
                detail: {
                  id,
                  title,
                  description,
                  done: target.checked
                }
              }));
            }}
          />
        </div>
      </div>

      <div>
        {
          isEditing ? 
            (
              <Input
                value={local.title}
                onChange={({ target }) => {
                  setLocal({
                    ...local,
                    title: target.value
                  });
                }}
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
                className="w-full"
                value={local.description}
                onChange={({ target }) => setLocal({ ...local, description: target.value })}
              />
            ) :
            description?.split('\n').map((s, i)=> <p key={`paragraph-${id}-${i}`}>{s}</p>)
        }
      </div>
      
      <div className="flex justify-evenly items-start">
        <div onClick={() => {
          if(isEditing) {
            onChange?.(
              new CustomEvent('TodoChange', {
                detail: {
                  ...local,
                  id,
                  done
                }
              })
            );
          }
          setEditing(!isEditing);
        }}>
          {
            isEditing
              ? (<button className="bg-purple-500 text-gray-100 px-2 py-1 rounded">Save</button>)
              : (<span className="text-blue-500">Edit</span>)
          }
        </div>
        <Button 
          variant="secondary"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}