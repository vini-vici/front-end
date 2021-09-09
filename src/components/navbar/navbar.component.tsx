import React from 'react';

import { Link } from 'react-router-dom';

import useCognito from '@/hooks/cognito';

export default function Navbar(): React.ReactElement {
  const { user, genericUser } = useCognito();
  return (
    <nav className="bg-gray-800 dark:bg-black text-gray-100 h-12 min-h-12 px-2 flex-shrink-0 flex items-center">
      <div className="container flex justify-between items-center">
        <div className="left-section">
          Todos
        </div>
        <div className="flex right-section gap-2">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {
            user?.getUsername() ?
              (
                <Link to="/logout">
                  Logout
                  <span className="text-gray-400 text-sm ml-1">
                    ({user?.getUsername()})
                  </span>
                </Link>
              ) :
              (
                <Link to="/login">Login</Link>
              )
          }
        </div>
      </div>
    </nav>
  );
}