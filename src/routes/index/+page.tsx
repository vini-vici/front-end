import React, { useEffect } from 'react';

import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '@vini-vici/viddi/dist/modal/modal.component';
import Input from '@vini-vici/viddi/dist/input/input.component';
import Textarea from '@vini-vici/viddi/dist/textarea/textarea.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import { RootState } from '@/redux/store';
import { Todo } from '@/redux/todos/todos.api';
import { useAddTodoMutation, useGetTodosQuery } from '@/redux/todos/todos.api';
import { useTranslation } from 'react-i18next';
import TodosContainerNew from '@/components/todos/todos.container';
import { useRecoilState } from 'recoil';
import createModal from '@/state/createModal';
import { useAddTodo } from '@/hooks/todos';

/**
 * @description Routes in general will not take any props in our application since the corresponding components
 * will always pull data from Redux.
 */
export default function IndexRoute(): React.ReactElement {

  const { idToken, cognitoStatus } = useSelector((r: RootState) => ({ idToken: r.cognito.idToken, showCreateModal: r.modal.show, cognitoStatus: r.cognito.status }));

  const initialTodos: Todo = {
    id: '',
    title: '',
    description: '',
    done: false
  };

  const { t } = useTranslation();

  const [{ title, description }, setTodo] = React.useState<Todo>(initialTodos);
  const addTodo = useAddTodo();

  const [showCreateModal, setShowCreateModal] = useRecoilState(createModal);

  if ((cognitoStatus === 'success' || cognitoStatus === 'failure') && idToken === '') return <Redirect to="/login" />;

  return (
    <div className="w-full sm:w-4/5 lg:w-3/4 mx-auto flex-grow">
      <TodosContainerNew />
      <Modal
        show={showCreateModal}
        title={
          <div className="text-xl font-bold">
            {t('Add a todo')}
          </div>
        }
        onClose={() => setShowCreateModal(false)}
        onConfirm={() => {
          addTodo.mutate({
            title,
            description,
            done: false
          });
          setShowCreateModal(false);
        }}
        confirmText={t('Submit')}
      >
        <FormField
          label={t('Todo title')}
          description={t('A todos title should be a good summarization of what the todo needs in order to be complete')}
        >
          <Input
            className="w-full"
            placeholder={t('Todo title...')}
            onChange={({ target }) => setTodo({ ...initialTodos, description, title: target.value })}
          />
        </FormField>

        <FormField
          label={t('Todo description')}
          description={t('Any details necessary to complete the todo should go here')}
        >
          <Textarea
            className="w-full"
            placeholder={t('Any details that are needed to complete the todo')}
            onChange={({ target }) => setTodo({ ...initialTodos, title, description: target.value })}
          />
        </FormField>
      </Modal>
    </div>
  );
}