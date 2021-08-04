import React from 'react';

import { Link } from 'react-router-dom';
import { COGNITO_DOMAIN, CLIENT_ID } from '@/constants';

export default function Navbar(): React.ReactElement {
  return (
    <nav className="bg-gray-800 text-gray-100 h-12 px-2 flex items-center">
      <div className="container flex justify-between items-center">
        <div className="left-section">
          Todos
        </div>
        <div className="flex right-section gap-2">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}