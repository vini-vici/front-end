import { UpdatePreference } from '@/hooks/cognito';
import { Input, FormField } from '@vini-vici/viddi';
import { Auth } from 'aws-amplify';
import { Formik } from 'formik';
import React from 'react';

export default function UserRoute(): React.ReactElement {



  const [initial, setInitial] = React.useState<UpdatePreference & { passwordConfirm: string; }>({
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    preferredUsername: '',
    email: ''
  });


  return (
    <div className="flex-grow">
      <div className="wrapper md:max-w-md lg:max-w-lg mx-auto my-2 md:border md:shadow-lg p-3">
        <h1 className="text-xl font-bold">
          Update Profile Information
        </h1>
        <Formik initialValues={initial} onSubmit={() => console.info('hi')}>
          {
            ({ dirty, errors, values, setFieldValue, isSubmitting }) => (
              <div>
                {JSON.stringify(values)}
                <FormField label="Password">
                  <Input type="password" placeholder="Current Password" value={values.oldPassword} onChange={e => setFieldValue('oldPassword', e.target.value)} />
                </FormField>
                {
                  values.oldPassword.trim() !== '' && 
                  <>
                    <FormField label="New Password">
                      <Input type="password" placeholder="New Password" value={values.password} onChange={e => setFieldValue('password', e.target.value)} />
                    </FormField>
                    <FormField label="Confirm Password">
                      <Input  disabled={values.password.trim().length === 0} type="password" placeholder="Confirm new password" value={values.passwordConfirm} onChange={e => setFieldValue('passwordConfirm', e.target.value)} />
                    </FormField>
                  </>
                }
              </div>
            )
          }
        </Formik>
      </div>
    </div>
  );
}