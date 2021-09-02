import React, { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import Input from '@vini-vici/viddi/dist/input/input.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import Button from '@vini-vici/viddi/dist/button/button.component';

import useCognito from '@/hooks/cognito';

export default function SignupRoute(): React.ReactElement {
  const { Auth, signUp, verify, user } = useCognito();

  const [signupData, setSignupData] = React.useState({
    username: '',
    confirmUsername: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    preferedUserName: ''
  });

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

  if(user?.username) 
    return <Redirect to="/" />;

  return (
    <div className="flex-grow">
      <div className="wrapper md:max-w-md lg:max-w-lg mx-auto my-2 md:border md:shadow-lg p-3">
        <h1 className="text-xl font-bold">
          Sign Up
        </h1>
        <form onSubmit={e => {
          e.preventDefault();
          if(validations.username && validations.password) {
            signUp(
              signupData.username,
              signupData.password,
              signupData.email,
              signupData.phone,
              signupData.preferedUserName
            ); // AFter we sign up, we have to do code validations.... do we redirect to another page?
          }
        }}>
          <FormField
            label="Username"
          >
            <Input className="w-full" placeholder="Desired Username" value={signupData.username} onChange={e => setSignupData({...signupData, username: e.target.value}) }/>
          </FormField>
          <FormField
            label="Confirm Username"
          >
            <Input className="w-full" placeholder="Confirm Username" value={signupData.confirmUsername} onChange={e => setSignupData({...signupData, confirmUsername: e.target.value}) }/>
          </FormField>
          <FormField
            label="Email"
          >
            <Input className="w-full" type="email" placeholder="Your email address, e.g. bob@company.com"/>
          </FormField>
          <FormField
            label="Password"
          >
            <Input className="w-full" type="password" placeholder="Enter your password"/>
          </FormField>
          <FormField
            label="Password Confirm"
          >
            <Input className="w-full" type="password" placeholder="Confirm your password" />
          </FormField>
          <FormField
            label="Phone Number"
          >
            <Input className="w-full" type="tel" placeholder="Enter your full phone number, including country code"/>
          </FormField>
          <FormField
            label="Preferred Username"
          >
            <Input className="w-full" type="text" placeholder="Enter your preferred username."/>
          </FormField>
          <div className="mt-2">
            <Button type="submit">Button</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
