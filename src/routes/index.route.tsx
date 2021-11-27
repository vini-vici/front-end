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
import { RootState } from '@/redux/root.reducer';
import { showCreateModal, hideCreateModal } from '@/redux/createModal/createModal.actions';
import { addTodo, fetchTodos } from '@/redux/todos/todos.action';
import { Todo } from '@/redux/todos/todos.reducer';
import useCognito from '@/hooks/cognito';
import { useGetTodosQuery, useAddTodoMutation } from '@/redux/todos/todos';

/**
 * @description Routes in general will not take any props in our application since the corresponding components
 * will always pull data from Redux.
 */
export default function IndexRoute(): React.ReactElement {

  const { user } = useCognito();

  const initialTodos: Todo = {
    id: '',
    title: '',
    description: '',
    done: false
  };

  const [{ title, description }, setTodo] = React.useState<Todo>(initialTodos);
  const {data, error, isLoading } = useGetTodosQuery();
  const [addTodo, { isLoading: addTodoLoading }] = useAddTodoMutation();

  console.log(data);

  return (
    <div>
      {addTodoLoading ? 'Adding todo....' : null}
      <FormField
        label="Todo Title"
      >
        <Input onChange={(e) => setTodo({title: e.target.value, description, done: false, id: ''})}/>
      </FormField>
      <FormField
        label="Description"
      >
        <Textarea placeholder="what you need to do in more detail, e.g. 'go to the store' " onChange={(e) => setTodo({ description: e.target.value, title, done: false, id: ''})}/>
      </FormField>
      <Button
        onClick={() => {
          addTodo({
            title,
            description
          });
        }}
      >Add Todo</Button>
      <hr/>
      {data?.map(todo => (
        <div className="todo" key={`todo-${todo.id}`}>
          <header className="font-bold" >{todo.title}</header>
          {todo.description}
        </div>
      ))}
    </div>
    // <div className="w-full sm:w-4/5 lg:w-3/4 mx-auto flex-grow">
    //   <Modal
    //     show={showModal}
    //     title={
    //       <div className="text-xl font-bold">
    //         Add a todo
    //       </div>
    //     }
    //     onClose={() => dispatch(hideCreateModal())}
    //     onConfirm={() => {
    //       dispatch(addTodo(title, description, done, user?.getSignInUserSession()?.getIdToken()?.getJwtToken()));
    //       dispatch(hideCreateModal());
    //     }}
    //     confirmText="Submit"
    //   >
    //     <FormField
    //       label="Todo Title"
    //       description="A todos title should be a good summarization of what the todo needs in order to be complete."
    //     >
    //       <Input
    //         className="w-full"
    //         placeholder="Todo title..."
    //         onChange={({ target }) => setTodo({id, description, done, title: target.value})}
    //       />
    //     </FormField>

    //     <FormField
    //       label="Todo Description"
    //       description="Any details necessary to complete the todo should go here."
    //     >
    //       <Textarea
    //         className="w-full"
    //         placeholder="Any details that are needed to complete the todo."
    //         onChange={({ target }) => setTodo({ id, title, done, description: target.value })}
    //       />
    //     </FormField>
    //   </Modal>
    //   <h1 className="text-2xl font-semibold p-3 flex justify-between">
    //     <div>Todos</div>
    //     <div className="flex gap-2">
    //       <div>
    //         <Button
    //           variant="custom"
    //           className="text-gray-400 hover:text-purple-500"
    //           onClick={() => dispatch(fetchTodos(user.getSignInUserSession().getIdToken().getJwtToken()))}
    //         >
    //           <Icon
    //             path={mdiRefresh}
    //             size={1}
    //           />
    //         </Button>
    //       </div>
    //       <div aria-label="Add Todo" title="Add todo">
    //         <Button
    //           variant="custom"
    //           className="text-gray-400 hover:text-purple-500"
    //           onClick={() => dispatch(showCreateModal())}
    //         >
    //           <Icon
    //             path={mdiPenPlus}
    //             size={1}
    //           />
    //         </Button>
    //       </div>
    //     </div>
    //   </h1>
    //   <div>
    //   </div>
    //   <TodosComponent />
    // </div>
  );
}