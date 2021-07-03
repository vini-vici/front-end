import React from 'react';

import { Link } from 'react-router-dom';

export default function Navbar(): React.ReactElement {
  return (
    <nav className="bg-gray-800 text-gray-100 h-12 px-2 flex justify-between items-center">
      <div className="left-section md:ml-10">
        Todos
      </div>
      <div className="right-section md:mr-10">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}