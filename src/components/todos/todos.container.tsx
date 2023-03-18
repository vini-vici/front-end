import React from 'react';
import { useTodos, useUpdateTodo, useRemoveTodo } from '@/hooks/todos';
import { Button } from '@vini-vici/viddi';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiPencilPlus, mdiRefresh } from '@mdi/js';
import { useRecoilState } from 'recoil';
import createModal from '@/state/createModal';
import TodoComponent from './todo.component';

export default function TodosContainerNew(): JSX.Element {

  const todos = useTodos();
  const { t } = useTranslation();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useRemoveTodo();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_showCreateModal, setShowCreateModal] = useRecoilState(createModal);

  return (
    <table className="todos  w-full border p-3 rounded border-collapse">
      <caption className="text-left py-3" style={{ margin: 'unset' }}>
        <h1 className="text-2xl font-semibold flex justify-between">
          <div>{t('Todos')}</div>
          <div className="actions">
            <Button variant="custom" title="Refresh Todos" className="text-gray-500 hover:text-purple-500" onClick={() => todos.refetch()}>
              <Icon path={mdiRefresh} size={1} />
            </Button>
            <Button variant="custom" title="Add todo" className="text-gray-500 hover:text-purple-500" onClick={() => setShowCreateModal(true)}>
              <Icon path={mdiPencilPlus} size={1} />
            </Button>
          </div>
        </h1>
      </caption>
      <thead>
        <tr>
          <th>
            {t('Done?')}
          </th>
          <th>
            {t('Title')}
          </th>
          <th>
            {t('Description')}
          </th>
          <th>
            {t('Actions')}
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
        {todos.data.map(todo => (
          <TodoComponent
            key={`todo-${todo.id}`}
            onDelete={e => deleteTodo.mutate(e)}
            onChange={t => updateTodo.mutate(t.detail)}
            onDone={t => updateTodo.mutate(t.detail)}
            {...todo}
          />
        ))}
      </tbody>
    </table>
  );
}