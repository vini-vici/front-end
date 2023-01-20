import { useCognitoLogout } from '@/hooks/cognito';
import React from 'react';

import { useHistory } from 'react-router-dom';

export default function LogoutRoute(): React.ReactElement {
  const logoutUser = useCognitoLogout();


  React.useEffect(() => {
    logoutUser.mutate();
  }, []);
  const history = useHistory();

  React.useEffect(() => {
    if (logoutUser.isSuccess)
      history.push('/login');

  }, [logoutUser.isSuccess]);


  return (
    <div>
      Logging out...
    </div>
  );
}
