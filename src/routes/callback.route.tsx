import React from 'react';
import { useLocation, Redirect, useRouteMatch } from 'react-router-dom';
import { COGNITO_DOMAIN, CLIENT_ID, REGION, POOL_ID} from '@/constants';

export default function CallbackRoute(): React.ReactElement {
  // Get the location search.
  const location = useLocation();
  // Get the
  const search = new URLSearchParams(location.search);
  
  // If we don't have a user login code, leave.
  if(!search.has('code')) 
    return <Redirect to={'/'} />;
  
  React.useEffect(() => {
    const cancel = new AbortController();

    const values = {
      code: search.get('code'),
      redirect_uri: 'http://localhost:8080',
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      scopes: [
        'email',
        'openid'
      ]
    };

    fetch(COGNITO_DOMAIN+'/oauth2/token', {
      signal: cancel.signal,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      method: 'POST',
      body: Object.entries(values).reduce((cum, [key, value]) => {
        cum.push(encodeURIComponent(key)+'='+encodeURIComponent(Array.isArray(value) ? value.join(',') : value));
        return cum;
      }, []).join('&')
    })
      .then(res => {
        console.log(res.ok);
      })
      .finally(() => console.log('any cleanup??'));
    return () => {
      cancel.abort();
    };
  }, []);

  return (
    <div className="flex-grow container">
      <pre>
        code: {search.get('code')}
      </pre>
    </div>
  );
}