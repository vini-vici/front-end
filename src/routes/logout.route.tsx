import React from 'react';

import useCognito from '@/hooks/cognito';
import { Redirect } from 'react-router-dom';

export default function LogoutRoute(): React.ReactElement {
  const { signOut } = useCognito();
  
  const [signedOut, setSignedOut] = React.useState(false);

  React.useEffect(() => {
    signOut()
      .finally(() => {
        setSignedOut(true);
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
