import { useCognitoLogout } from '@/hooks/cognito';
import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function LogoutRoute(): React.ReactElement {
  const logoutUser = useCognitoLogout();


  React.useEffect(() => {
    logoutUser.mutate();
  }, []);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (logoutUser.isSuccess)
      navigate('/login');

  }, [logoutUser.isSuccess]);


  return (
    <div>
      Logging out...
    </div>
  );
}
