import { signupUserThunk, updateUserThunk, verifyUserThunk } from '@/redux/cognito/cognito.thunk';
import { RootState } from '@/redux/store';
import Button from '@vini-vici/viddi/dist/button/button.component';
import FormField from '@vini-vici/viddi/dist/formfield/formfield.component';
import Input from '@vini-vici/viddi/dist/input/input.component';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function UserRoute(): React.ReactElement{

    const {
        loggedInUser,
        needsVerification
      } = useSelector(({ cognito: { username, needsVerification, idToken  } }: RootState) => ({ loggedInUser: username, needsVerification, idToken }));
    
      const dispatch = useDispatch();

      const [updateData, setUpdateData] = React.useState({
        password: '',
        confirmPassword: '',
        email: '',
        preferedUserName: ''
      });

    const [token, setToken] = React.useState('');

    const [validations, setValidations] = React.useState({
        password: true
    });

    const [redirect, setRedirect] = React.useState(false);
    const [error, setError] = React.useState('');

    useEffect(() => {
        setValidations({
          password: (updateData.password.length > 0 && updateData.confirmPassword.length > 0) && updateData.password === updateData.confirmPassword
        });
      }, [updateData.password, updateData.confirmPassword]);

    // Make sure this is right with Jim

    if(redirect || (loggedInUser && needsVerification))
    return <Redirect to="/" />;

    return(
        <div className="flex-grow">
      <div className="wrapper md:max-w-md lg:max-w-lg mx-auto my-2 md:border md:shadow-lg p-3">
        <div>
          {error}
        </div>
        <h1 className="text-xl font-bold">
          Update Profile Information
        </h1>
        <form onSubmit={e => {
          e.preventDefault();
          // Need a updateUserThunk
          if(validations.password && !needsVerification) {
            dispatch(updateUserThunk({
              ...updateData
            }));
          } else if(needsVerification && token.length) {
            dispatch(verifyUserThunk({
              code: token,
              password: updateData.password
            }));
          }
        }}>
          <FormField
            label="Update Email"
          >
            <Input
              disabled={needsVerification}
              className="w-full"
              type="email"
              placeholder="Your email address, e.g. bob@company.com"
              onChange={e => setUpdateData({ ...updateData, email: e.target.value })}
            />
          </FormField>
          <FormField
            label="New Password"
          >
            <Input
              disabled={needsVerification}
              className="w-full"
              type="password"
              placeholder="Enter your password"
              onChange={e => setUpdateData({ ...updateData, password: e.target.value })}
            />
          </FormField>
          <FormField
            label="New Password Confirm"
          >
            <Input
              disabled={needsVerification}
              className="w-full"
              type="password"
              placeholder="Confirm your password"
              onChange={e => setUpdateData({ ...updateData, confirmPassword: e.target.value })}
            />
          </FormField>
          <FormField
            label="Update Preferred Username"
          >
            <Input
              disabled={needsVerification}
              className="w-full"
              type="text"
              placeholder="Enter your preferred username."
              onChange={e => setUpdateData({ ...updateData, preferedUserName: e.target.value })}
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
              {needsVerification ? 'Verify' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
    );
}