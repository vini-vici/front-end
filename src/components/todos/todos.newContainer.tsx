import React from 'react';
import { useTodos } from '@/hooks/todos';
import { Button, Checkbox } from '@vini-vici/viddi';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiPencilPlus, mdiRefresh } from '@mdi/js';

export default function TodosContainerNew(): JSX.Element {

  const something = useTodos();
  const { t } = useTranslation();

  return (
    <table className="todos  w-full border p-3 rounded border-collapse">
      <caption className="text-left py-3" style={{ margin: 'unset' }}>
        <h1 className="text-2xl font-semibold flex justify-between">
          <div>{t('Todos')}</div>
          <div className="actions">
            <Button variant="custom" className="text-gray-500 hover:text-purple-500">
              <Icon path={mdiRefresh} size={1} />
            </Button>
            <Button variant="custom" className="text-gray-500 hover:text-purple-500">
              <Icon path={mdiPencilPlus} size={1} />
            </Button>
          </div>
        </h1>
      </caption>
      <thead>
        <tr>
          <th>
            Status
          </th>
          <th>
            Title
          </th>
          <th>
            Description
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <colgroup>
        <col style={{ width: 'fit-content', textAlign: 'center' }} />
        <col />
        <col />
        <col />
      </colgroup>
      <tbody>
        {something.data.map(todo => (
          <tr key={`todo-${todo.id}`} className="border p-3 rounded">
            <td className="p-3" align="center">
              <div className="flex gap-4 justify-center align-center">
                <div>
                  <Checkbox onChange={() => console.info('help')} checked={todo.done} />
                </div>
                <div>
                  {todo.done ? t('Done') : t('Not done')}
                </div>
              </div>
            </td>
            <td>
              {todo.title}
            </td>
            <td>{todo.description}</td>
            <td>Actions go here</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}