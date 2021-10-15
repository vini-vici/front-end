import React from 'react';

import useCognito from '@/hooks/cognito';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetTodos } from '@/redux/todos/todos.action';

export default function LogoutRoute(): React.ReactElement {
  const dispatch = useDispatch();
  const { signOut } = useCognito();
  
  const [signedOut, setSignedOut] = React.useState(false);

  React.useEffect(() => {
    signOut()
      .finally(() => {
        setSignedOut(true);
        dispatch(resetTodos());
      });
  });

  if(signedOut) 
    return <Redirect to="/"/>;
    
  return (
    <div>
      Logging out...
    </div>
  );
}
