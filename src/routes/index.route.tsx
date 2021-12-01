import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiPenPlus, mdiRefresh } from '@mdi/js';
import TodosComponent from '@/components/todos/todos.container';
import Modal from '@vini-vici/viddi/dist/modal/modal.component';
import Button from '@vini-vici/viddi/dist/button/button.component';
import Input from '@vini-vici/viddi/dist/input/input.component';
import Textarea from '@vini-vici/viddi/dist/textarea/textarea.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import { RootState } from '@/redux/store';
import { Todo } from '@/redux/todos/todos.api';
import { useAddTodoMutation, useGetTodosQuery } from '@/redux/todos/todos.api';
import { hideModal, showModal } from '@/redux/createModal/createModal.slice';

/**
 * @description Routes in general will not take any props in our application since the corresponding components
 * will always pull data from Redux.
 */
export default function IndexRoute(): React.ReactElement {

  const dispatch = useDispatch();

  const { idToken, showCreateModal } = useSelector((r: RootState) => ({ idToken: r.cognito.idToken, showCreateModal: r.modal.show }));

  const initialTodos: Todo = {
    id: '',
    title: '',
    description: '',
    done: false
  };

  const [{ title, description }, setTodo] = React.useState<Todo>(initialTodos);
  const [ addTodo ] = useAddTodoMutation();
  const { refetch } = useGetTodosQuery(undefined, {
    skip: idToken === '',
    
  });

  return (
    <div className="w-full sm:w-4/5 lg:w-3/4 mx-auto flex-grow">
      <Modal
        show={showCreateModal}
        title={
          <div className="text-xl font-bold">
            Add a todo
          </div>
        }
        onClose={() => dispatch(hideModal())}
        onConfirm={() => {
          addTodo({
            title,
            description,
            done: false
          });
          dispatch(hideModal());
        }}
        confirmText="Submit"
      >
        <FormField
          label="Todo Title"
          description="A todos title should be a good summarization of what the todo needs in order to be complete."
        >
          <Input
            className="w-full"
            placeholder="Todo title..."
            onChange={({ target }) => setTodo({ ...initialTodos, description, title: target.value })}
          />
        </FormField>

        <FormField
          label="Todo Description"
          description="Any details necessary to complete the todo should go here."
        >
          <Textarea
            className="w-full"
            placeholder="Any details that are needed to complete the todo."
            onChange={({ target }) => setTodo({ ...initialTodos, title, description: target.value })}
          />
        </FormField>
      </Modal>
      <h1 className="text-2xl font-semibold p-3 flex justify-between">
        <div>Todos</div>
        <div className="flex gap-2">
          <div>
            <Button
              variant="custom"
              className="text-gray-400 hover:text-purple-500"
              onClick={() => refetch()}
            >
              <Icon
                path={mdiRefresh}
                size={1}
              />
            </Button>
          </div>
          <div aria-label="Add Todo" title="Add todo">
            <Button
              variant="custom"
              className="text-gray-400 hover:text-purple-500"
              onClick={() => dispatch(showModal())}
            >
              <Icon
                path={mdiPenPlus}
                size={1}
              />
            </Button>
          </div>
        </div>
      </h1>
      <div>
      </div>
      <TodosComponent />
    </div>
  );
}