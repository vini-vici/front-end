import React from 'react';

export default function AboutRoute(): React.ReactElement {
  return (
    <div className="flex-grow">
      <div className="container">
        <h1 className="text-2xl">
          About this project
        </h1>
        <p>
          This project is about showing more about the <em>architecture</em> of a larger app
          than it is about what the app <em>does</em>.
        </p>
        <h2 className="text-xl">
          So, what do we get out of it?
        </h2>
        <p>
          We see an application with quite a few components,
          unit tests, and e2e tests. As well, we get to see
          how to integrate with things like the AWS CDK, 
          which builds our staging and production URLs.
        </p>
      </div>
    </div>
  );
}