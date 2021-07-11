import React from 'react';

export default function Footer(): React.ReactElement {
  return (
    <footer className="bg-purple-900 text-gray-50 p-3">
      <div className="container w-full sm:w-4/5 lg:3/4 mx-auto grid grid-cols-4">
        <div className="col-span-4 text-center">
          &copy; Jim Burbridge
        </div>
      </div>
    </footer>
  );
}