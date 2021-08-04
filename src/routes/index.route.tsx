import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiPenPlus } from '@mdi/js';
import TodosComponent from '@/components/todos/todos.container';
import Modal from '@/components/modal/modal.component';
import Button from '@/components/button/button.component';
import Input from '@/components/input/input.component';
import Textarea from '@/components/textarea/textarea.component';
import FormField from '@/components/formfield/formfield.component';
import { RootState } from '@/redux/root.reducer';
import { showCreateModal, hideCreateModal } from '@/redux/createModal/createModal.actions';
import { addTodo } from '@/redux/todos/todos.action';
import { Todo } from '@/redux/todos/todos.reducer';
import useCognito from '@/hooks/cognito';
import Auth from '@aws-amplify/auth';

/**
 * @description Routes in general will not take any props in our application since the corresponding components
 * will always pull data from Redux.
 */
export default function IndexRoute(): React.ReactElement {
  // Creates a dispatch function
  const dispatch = useDispatch();
  // maps the state to the what we need.
  const showModal = useSelector(({ CreateModalState: { show }}: RootState) => (show));

  const initialTodos: Todo = {
    id: -1,
    title: '',
    description: '',
    done: false
  };
  const [{id, title, description, done}, setTodo] = React.useState(initialTodos);

  useCognito();
  
  React.useEffect(() => {
    // Auth.signIn('username', 'password');
  }, []);

  return (
    <div className="w-full sm:w-4/5 lg:w-3/4 mx-auto flex-grow">
      <Modal
        show={showModal}
        title={
          <div>
            Sup
          </div>
        }
        onClose={() => dispatch(hideCreateModal())}
        onConfirm={() => {
          dispatch(addTodo(title, description, done));
          dispatch(hideCreateModal());
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
            onChange={({ target }) => setTodo({id, description, done, title: target.value})}
          />
        </FormField>

        <FormField
          label="Todo Description"
          description="Any details necessary to complete the todo should go here."
        >
          <Textarea
            className="w-full"
            placeholder="Any details that are needed to complete the todo."
            onChange={({ target }) => setTodo({ id, title, done, description: target.value })}
          />
        </FormField>

      </Modal>
      <h1 className="text-2xl font-semibold p-3 flex justify-between">
        <div>Todos App</div>
        <div aria-label="Add Todo" title="Add todo">
          <Button
            variant="custom"
            className="text-gray-400 hover:text-purple-500"
            onClick={() => dispatch(showCreateModal())}
          >
            <Icon
              path={mdiPenPlus}
              size={1}
            />
          </Button>
        </div>
      </h1>
      <TodosComponent />
    </div>
  );
}