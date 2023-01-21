import React from 'react';

import Input from '@vini-vici/viddi/dist/input/input.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import Button from '@vini-vici/viddi/dist/button/button.component';
import Modal from '@vini-vici/viddi/dist/modal/modal.component';
import { Link, useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useCognito, useCognitoLogin } from '@/hooks/cognito';
import { Loading } from '@vini-vici/viddi';

export default function LoginRoute(): React.ReactElement {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showClearModal, setClearModal] = React.useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const loginUser = useCognitoLogin();
  const cognito = useCognito();

  React.useEffect(() => {
    if (cognito.isSuccess && cognito.data.idToken !== '')
      history.push('/');

  }, [cognito.isSuccess, cognito.data]);

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
        <h1 className="text-xl font-semibold flex">
          {t('Login-form')}
          {
            loginUser.isLoading &&
            <Loading text="" />
          }
        </h1>
        {
          loginUser.isError &&
          (
            <div className="border border-red-600 bg-red-300 p-1">
              {(loginUser.error as any)?.message}
            </div>
          )
        }
        <form
          onSubmit={e => {
            e.preventDefault();
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
              disabled={cognito.isLoading}
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
              disabled={cognito.isLoading}
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
                loginUser.mutate({
                  username,
                  password,
                });
                // loginHandler();
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