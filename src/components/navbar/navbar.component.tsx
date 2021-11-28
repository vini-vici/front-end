import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';

export default function Navbar(): React.ReactElement {
  const user = useSelector((v: RootState) => v.cognito);
  return (
    <nav className="bg-gray-800 dark:bg-black text-gray-100 h-12 min-h-12 px-2 flex-shrink-0 flex items-center">
      <div className="container flex justify-between items-center">
        <div className="left-section flex items-center">
          <img src="./vicci-favicon.svg" style={{ height: '1.5em', display: 'inline-block', marginRight: '0.5em'}} alt="Vicci" />
          <div>
            Vicci
          </div>
        </div>
        
        <div className="flex right-section gap-2">
          <NavLink to="/" exact activeClassName="font-semibold underline">Home</NavLink>
          <NavLink to="/about" activeClassName="font-semibold underline">About</NavLink>
          {
            user.preferredUsername || user.username ?
              (
                <Link to="/logout">
                  Logout
                  <span className="text-gray-400 text-sm ml-1">
                    ({user.preferredUsername || user.username})
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