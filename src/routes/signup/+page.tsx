import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Input from '@vini-vici/viddi/dist/input/input.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import Button from '@vini-vici/viddi/dist/button/button.component';
import { useTranslation } from 'react-i18next';
import { useCognito, useSignupUser } from '@/hooks/cognito';

export default function SignupRoute(): React.ReactElement {

  const navigate = useNavigate();
  const cognito = useCognito();

  const [signupData, setSignupData] = React.useState({
    username: '',
    confirmUsername: '',
    password: '',
    confirmPassword: '',
    email: '',
    preferedUserName: ''
  });

  const [token, setToken] = React.useState('');

  const [validations, setValidations] = React.useState({
    username: true,
    password: true
  });

  useEffect(() => {
    setValidations({
      username: (signupData.username.length > 0 && signupData.confirmUsername.length > 0) && signupData.username === signupData.confirmUsername,
      password: (signupData.password.length > 0 && signupData.confirmPassword.length > 0) && signupData.password === signupData.confirmPassword
    });
  }, [signupData.username, signupData.confirmUsername, signupData.password, signupData.confirmPassword]);

  const { t } = useTranslation();
  const signupUser = useSignupUser();

  /**
   * 1. Fill in information
   * 2. Send data to cognito.
   * 3. on success from cognito, switch to verification mode.
   * 4. Wait for verification token to be input
   * 5. On successful verification, auth the user?
   */

  useEffect(() => {
    if (signupUser.data && !signupUser.data.needsVerification)
      navigate('/login');

  }, [signupUser.data]);

  return (
    <div className="flex-grow">
      <div className="wrapper md:max-w-md lg:max-w-lg mx-auto my-2 md:border md:shadow-lg p-3">
        {signupUser.isError && (
          <div className="border border-red-600 bg-red-300 p-1 my-2">
            {signupUser.error.message}
          </div>
        )}
        <h1 className="text-xl font-bold">
          {t('Signup-page.title') as string}
        </h1>
        <form onSubmit={e => {
          e.preventDefault();

          if (signupUser.data === undefined) {
            signupUser.mutate({
              username: signupData.username,
              password: signupData.password,
              email: signupData.email,
              preferredUsername: signupData.preferedUserName,
            });
          } else {
            signupUser.mutate({
              username: signupData.username,
              password: signupData.password,
              email: signupData.email,
              preferredUsername: signupData.preferedUserName,
              code: token,
            });
          }
        }}>
          <FormField
            label={t('Username')}
          >
            <Input
              className="w-full"
              placeholder={t('Signup-page.Desired-username')}
              value={signupData.username}
              onChange={e => setSignupData({ ...signupData, username: e.target.value })}
            />
          </FormField>
          <FormField
            label={t('Signup-page.Confirm-username')}
          >
            <Input disabled={!!signupUser.data} className="w-full" placeholder={t('Signup-page.Confirm-username')} value={signupData.confirmUsername} onChange={e => setSignupData({ ...signupData, confirmUsername: e.target.value })} />
          </FormField>
          <FormField
            label={t('Signup-page.Email')}
          >
            <Input
              disabled={!!signupUser.data}
              className="w-full"
              type="email"
              placeholder={t('Signup-page.Email-description')}
              onChange={e => setSignupData({ ...signupData, email: e.target.value })}
            />
          </FormField>
          <FormField
            label={t('Password')}
          >
            <Input
              disabled={!!signupUser.data}
              className="w-full"
              type="password"
              placeholder={t('Signup-page.Password-description')}
              onChange={e => setSignupData({ ...signupData, password: e.target.value })}
            />
          </FormField>
          <FormField
            label={t('Signup-page.Confirm-password')}
          >
            <Input
              disabled={!!signupUser.data}
              className="w-full"
              type="password"
              placeholder={t('Signup-page.Confirm-password-description')}
              onChange={e => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            />
          </FormField>
          <FormField
            label={t('Signup-page.Preferred-username')}
            description={t('Signup-page.Preferred-username-description')}
          >
            <Input
              disabled={!!signupUser.data}
              className="w-full"
              type="text"
              placeholder={t('Signup-page.Preferred-username-placeholder')}
              onChange={e => setSignupData({ ...signupData, preferedUserName: e.target.value })}
            />
          </FormField>
          {
            !!signupUser.data &&
            (
              <FormField
                label={t('Signup-page.Verification-code')}
              >
                <Input type="text" value={token} onChange={e => setToken(e.target.value)} />
              </FormField>
            )
          }
          <div className="mt-2">
            <Button type="submit">
              {t('Signup-page.Verify') as string}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
