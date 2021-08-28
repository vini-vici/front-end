import React, { useEffect } from 'react';

import Input from '@vini-vici/viddi/dist/input/input.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import Button from '@vini-vici/viddi/dist/button/button.component';

import useCognito from '@/hooks/cognito';

export default function SignupRoute(): React.ReactElement {
  const { Auth } = useCognito({
    clientId: '',
    poolId: '',
    region: ''
  });

  const [signupData, setSignupData] = React.useState({
    username: '',
    confirmUsername: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: ''
  });

  const [validations, setValidations] = React.useState({
    username: true,
    password: true
  });

  useEffect(() => {
    setValidations({
      username: signupData.username === signupData.confirmUsername,
      password: signupData.password === signupData.confirmPassword
    });
  }, [signupData.username, signupData.confirmUsername, signupData.password, signupData.confirmPassword]);

  return (
    <div className="flex-grow">
      <div className="wrapper md:max-w-md lg:max-w-lg mx-auto my-2 md:border md:shadow-lg p-3">
        <h1 className="text-xl font-bold">
          Sign Up
        </h1>
        {JSON.stringify(validations)}
        <form onSubmit={e => {
          e.preventDefault();
          if(validations.username && validations.password) {
            Auth.signUp({
              username: signupData.username,
              password: signupData.password,
              attributes: {
                email: signupData.email,
                phone_number: signupData.phone
              }
            })
              .then(res =>  console.log(res));
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
          <div className="mt-2">
            <Button type="submit">Button</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
