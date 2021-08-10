import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { COGNITO_DOMAIN, CLIENT_ID} from '@/constants';

export default function CallbackRoute(): React.ReactElement {
  // Get the location search.
  const location = useLocation();
  // Get the
  const search = new URLSearchParams(location.search);
  
  // If we don't have a user login code, leave.
  if(!search.has('code')) 
    return <Redirect to={'/'} />;
  
  return (
    <div className="flex-grow container">
      <pre>
        code: {search.get('code')}
      </pre>
    </div>
  );
}