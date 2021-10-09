import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import useCognito from '@/hooks/cognito';

export default function Navbar(): React.ReactElement {
  const { user } = useCognito();
  return (
    <nav className="bg-gray-800 dark:bg-black text-gray-100 h-12 min-h-12 px-2 flex-shrink-0 flex items-center">
      <div className="container flex justify-between items-center">
        <div className="left-section">
          Vicci
        </div>
        <div className="flex right-section gap-2">
          <NavLink to="/" exact activeClassName="font-semibold underline">Home</NavLink>
          <NavLink to="/about" activeClassName="font-semibold underline">About</NavLink>
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