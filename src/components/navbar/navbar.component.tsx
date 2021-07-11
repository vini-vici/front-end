import React from 'react';

import { Link } from 'react-router-dom';

export default function Navbar(): React.ReactElement {
  return (
    <nav className="bg-gray-800 text-gray-100 h-12 px-2 flex items-center">
      <div className="container mx-auto w-full sm:w-4/5 lg:w-3/4 flex justify-between items-center">
        <div className="left-section">
          Todos
        </div>
        <div className="right-section">
          <Link to="/">Home</Link>
        </div>
      </div>
    </nav>
  );
}