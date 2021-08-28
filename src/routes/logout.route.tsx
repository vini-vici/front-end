import React from 'react';

import useCognito from '@/hooks/cognito';
import { Redirect } from 'react-router-dom';

export default function LogoutRoute(): React.ReactNode {
  const { signOut } = useCognito({
    clientId: '',
    poolId: '',
    region: ''
  });
  
  const [signedOut, setSignedOut] = React.useState(false);
  React.useEffect(() => {
    signOut()
      .finally(() => setSignedOut(true));
  });
  if(signedOut) 
    return <Redirect to="/"/>;
    
  return (
    <div>
      Logging out...
    </div>
  );
}