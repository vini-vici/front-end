import React from 'react';

import Input from '@vini-vici/viddi/dist/input/input.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import Button from '@vini-vici/viddi/dist/button/button.component';
import Modal from '@vini-vici/viddi/dist/modal/modal.component';
import { Link, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { loginUserThunk } from '@/redux/cognito/cognito.thunk';
import { useTranslation } from 'react-i18next';


export default function LoginRoute(): React.ReactElement {
  const user = useSelector(({ cognito }: RootState) => cognito);
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showClearModal, setClearModal] = React.useState(false);
  const { t } = useTranslation();

  const loginHandler = () => {
    // signIn(username, password)
    //   .catch(e => setError(e.message));
    dispatch(loginUserThunk({
      username,
      password
    }));
  };

  if(user.username) 
    return <Redirect to="/" />;
  

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
        {t('Clear-form')}
      </Modal>
      <div className="mx-auto my-2 p-3 max-w-sm border shadow-lg rounded-md">
        <h1 className="text-xl font-semibold">
          {t('Login-form')}
        </h1>
        {
          user?.error &&
          (
            <div className="border border-red-600 bg-red-300 p-1">
              {user.error}
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
            label={t('Username')}
            description={t('Username-description')}
          >
            <Input
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
              className="w-full"
              disabled={user.isLoading}
              placeholder={t('Username-placeholder')}
            />
          </FormField>
          <FormField
            label={t('Password')}
            description={t('Password-description')}
          >
            <Input
              type="password"
              className="w-full"
              placeholder={t('Password-placeholder')}
              value={password}
              disabled={user.isLoading}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </FormField>
          <div className="mt-2 text-right">
            <Link to="/signup">{t('Signup')}</Link>
          </div>
          <div className="flex mt-3 justify-end gap-2">
            <Button
              variant="secondary" 
              onClick={() => {
                setClearModal(true);
              }}
            >
              {t('Reset')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                loginHandler();
              }}
            >
              {t('Submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}