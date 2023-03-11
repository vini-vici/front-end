import React from 'react';
import Icon from '@mdi/react';
import { mdiPencil, mdiTrashCan } from '@mdi/js';
import { DomClasses as Dc, Input, Textarea, Checkbox, Button, } from '@vini-vici/viddi';

export interface Todo {
  title: string;
  description: string;
  id: string;
  done: boolean;
}

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

  const rowClasses = new Dc('border rounded');

  return (
    <tr className={rowClasses.toString()}>
      <td className="border-l p-3 text-center">
        <div className="mx-auto">
          <Checkbox
            checked={done}
            onChange={e => {
              onDone(new CustomEvent('TodoDone', {
                detail: {
                  id,
                  title,
                  description,
                  done: (e.target as HTMLInputElement).checked
                }
              }));
            }}
          />
        </div>
      </td>

      <td>
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
            ) :
            title
        }
      </td>
      <td className="p-3">
        {
          isEditing ?
            (
              <Textarea
                className="w-full"
                value={local.description}
                onChange={e => setLocal({ ...local, description: (e.target as HTMLTextAreaElement).value })}
              />
            ) :
            description?.split('\n').map((s, i) => <p key={`paragraph-${id}-${i}`}>{s}</p>)
        }
      </td>

      <td className="p-3">

        <div className="flex justify-center items-center gap-4">
          {
            isEditing && <Button className="rounded" onClick={() => {
              onChange?.(new CustomEvent('TodoChange', {
                detail: {
                  ...local,
                  id,
                  done,
                }
              }));
              setEditing(false);
            }}>Save</Button>
          }
          {
            !isEditing &&
            <Button className="text-blue-500 px-2 py-1 bg-white" variant="custom" onClick={() => {
              setEditing(true);
            }}>
              <Icon path={mdiPencil} title="Edit" size={1} />
            </Button>
          }

          <Button
            variant="secondary"
            onClick={() => onDelete(id)}
          >
            <Icon path={mdiTrashCan} title="Delete" size={1} />
          </Button>
        </div>
      </td>
    </tr>
  );
}