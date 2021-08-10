import React from 'react';

import Input from '@/components/input/input.component';
import FormField from '@/components/formfield/formfield.component';
import Button from '@/components/button/button.component';
import Modal from '@/components/modal/modal.component';

import Auth from '@aws-amplify/auth';

import { useHistory } from 'react-router-dom';
import useCognito from '@/hooks/cognito';


export default function LoginRoute(): React.ReactElement {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showClearModal, setClearModal] = React.useState(false);
  const [error, setError] = React.useState('');
  const history = useHistory();

  const { Auth, userData } = useCognito();

  const loginHandler = () => {
    console.log(`Login with ${username} and ${password}`);
  };

  return (
    <div className="flex-grow">
      <Modal
        show={showClearModal}
        title="Clear Form"
        onClose={() => {
          setClearModal(false);
        }}
        onConfirm={() => {
          setUsername('');
          setPassword('');
          setClearModal(false);
        }}
      >
        Are you sure you want to clear the form?
      </Modal>
      <div className="mx-auto my-2 p-3 max-w-sm border shadow-lg rounded-md">
        <h1 className="text-xl font-semibold">Login Form</h1>
        {
          error &&
          (
            <div className="border border-red-600 bg-red-300 p-1">
              {error}
            </div>
          )
        }
        <form 
          onSubmit={e => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <FormField
            label="Username"
            description="Could be your email address or chosen username"
          >
            <Input
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
              className="w-full"
              placeholder={'"bob@email.com" or just "bob_rocks89"'}
            />
          </FormField>
          <FormField
            label="Password"
            description="Passwords must contain a whole bunch of things."
          >
            <Input
              type="password"
              className="w-full"
              placeholder="Passwords should contain an upper case, number, and special symbol."
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </FormField>
          <div className="mt-2 text-right">
            <a href="/">Signup</a>
          </div>
          <div className="flex mt-3 justify-end gap-2">
            <Button
              variant="secondary" 
              onClick={() => {
                setClearModal(true);
              }}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                loginHandler();
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}