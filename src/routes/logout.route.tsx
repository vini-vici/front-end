import { logoutUserThunk } from '@/redux/cognito/cognito.thunk';
import { RootState } from '@/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

export default function LogoutRoute(): React.ReactElement {
  const dispatch = useDispatch();
  const username = useSelector((r: RootState) => r.cognito.username);
  
  const [signedOut, setSignedOut] = React.useState(false);

  React.useEffect(() => {
    dispatch(logoutUserThunk());
  }, []);

  React.useEffect(() => {
    if(username === '')
      setSignedOut(true);
  }, [username]);

  if(signedOut) 
    return <Redirect to="/"/>;
    
  return (
    <div>
      Logging out...
    </div>
  );
}
