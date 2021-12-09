import React, { useEffect } from 'react';

import { Redirect } from 'react-router-dom';
import { signupUserThunk, verifyUserThunk } from '@/redux/cognito/cognito.thunk';

import Input from '@vini-vici/viddi/dist/input/input.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import Button from '@vini-vici/viddi/dist/button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function SignupRoute(): React.ReactElement {

  const {
    loggedInUser,
    needsVerification,
    error
  } = useSelector(({ cognito: { username, needsVerification, idToken, error  } }: RootState) => ({ loggedInUser: username, needsVerification, idToken, error }));

  const dispatch = useDispatch();

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

  const [redirect, setRedirect] = React.useState(false);

  useEffect(() => {
    setValidations({
      username: (signupData.username.length > 0 && signupData.confirmUsername.length > 0) && signupData.username === signupData.confirmUsername,
      password: (signupData.password.length > 0 && signupData.confirmPassword.length > 0) && signupData.password === signupData.confirmPassword
    });
  }, [signupData.username, signupData.confirmUsername, signupData.password, signupData.confirmPassword]);


  if(redirect || (loggedInUser && !needsVerification))
    return <Redirect to="/" />;

  return (
    <div className="flex-grow">
      <div className="wrapper md:max-w-md lg:max-w-lg mx-auto my-2 md:border md:shadow-lg p-3">
        {error && (
          <div className="border border-red-600 bg-red-300 p-1 my-2">
            {error}
          </div>
        )}
        <h1 className="text-xl font-bold">
          Sign Up
        </h1>
        <form onSubmit={e => {
          e.preventDefault();
          if(validations.username && validations.password && !needsVerification) {
            dispatch(signupUserThunk({
              ...signupData
            }));
          } else if(needsVerification && token.length) {
            dispatch(verifyUserThunk({
              code: token,
              password: signupData.password
            }));
          }
        }}>
          <FormField
            label="Username"
          >
            <Input
              className="w-full"
              placeholder="Desired Username"
              value={signupData.username}
              onChange={e => setSignupData({ ...signupData, username: e.target.value }) }
            />
          </FormField>
          <FormField
            label="Confirm Username"
          >
            <Input disabled={needsVerification} className="w-full" placeholder="Confirm Username" value={signupData.confirmUsername} onChange={e => setSignupData({ ...signupData, confirmUsername: e.target.value }) }/>
          </FormField>
          <FormField
            label="Email"
          >
            <Input
              disabled={needsVerification}
              className="w-full"
              type="email"
              placeholder="Your email address, e.g. bob@company.com"
              onChange={e => setSignupData({ ...signupData, email: e.target.value })}
            />
          </FormField>
          <FormField
            label="Password"
          >
            <Input
              disabled={needsVerification}
              className="w-full"
              type="password"
              placeholder="Enter your password"
              onChange={e => setSignupData({ ...signupData, password: e.target.value })}
            />
          </FormField>
          <FormField
            label="Password Confirm"
          >
            <Input
              disabled={needsVerification}
              className="w-full"
              type="password"
              placeholder="Confirm your password"
              onChange={e => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            />
          </FormField>
          <FormField
            label="Preferred Username"
          >
            <Input
              disabled={needsVerification}
              className="w-full"
              type="text"
              placeholder="Enter your preferred username."
              onChange={e => setSignupData({ ...signupData, preferedUserName: e.target.value })}
            />
          </FormField>
          {
            needsVerification && 
            (
              <FormField
                label="Verification Code"
              >
                <Input type="text" value={token} onChange={e => setToken(e.target.value)} />
              </FormField>
            )
          }
          <div className="mt-2">
            <Button type="submit">
              {needsVerification ? 'Verify' : 'Sign Up'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
