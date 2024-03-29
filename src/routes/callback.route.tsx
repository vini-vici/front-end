import React from 'react';
import { useLocation, redirect } from 'react-router-dom';

export default function CallbackRoute(): React.ReactElement {
  // Get the location search.
  const location = useLocation();
  // Get the
  const search = new URLSearchParams(location.search);

  // If we don't have a user login code, leave.
  if (!search.has('code')) {
    redirect('/');
    return null;
  }

  return (
    <div className="flex-grow container">
      <pre>
        code: {search.get('code')}
      </pre>
    </div>
  );
}