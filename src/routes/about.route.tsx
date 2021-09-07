import React from 'react';

export default function AboutRoute(): React.ReactElement {
  return (
    <div className="flex-grow">
      <div className="container pb-3">
        <h1 className="text-2xl mt-3">
          About this project
        </h1>
        <p>
          This project is about showing more about the <em>architecture</em> of a larger app
          than it is about what the app <em>does</em>. For newer people it often is about how cool
          what they are working on is. This works well, except for in trying to dive into what they perceive as
          cool they miss a lot of the more minor steps.
        </p>

        <h2 className="text-xl mt-3">
          The Author
        </h2>
        <p>
          Before we go any further, let me introduce myself. My name is Jim Burbridge and I've been working
          in the web since I was 12. I did freelance throughout middle and high school, have interviewed with multiple
          FAANG companies (and currently work at one). I am currently a Front-End Engineer by title, but I will do work anywhere that is interesting.
        </p>

        <h2 className="text-xl mt-3">
          So, what do <em>we</em> get out of it?
        </h2>
        <p>
          We see an application with quite a few components,
          unit tests, and e2e tests. As well, we get to see
          how to integrate with things like the AWS CDK,
          which builds our staging and production URLs; and AWS Cognito, which is how we handle our user login system.
        </p>

        <h2 className="text-xl mt-3">
          So, what's the stack?
        </h2>
        <p>
          Glad you asked! Unfortunately there isn't a simple solid answer I can give you. Applications tend to be more complex than people think.
          The components responsible for the build of the Front-end are:
        </p>
        <div className="flex flex-col md:flex-row gap-2 mt-3">
          <div className="md:flex-grow">
            <h3 className="text-lg underline">
              Front-End
            </h3>
            <ul className="list-disc list-inside">
              <li>React</li>
              <li>TypeScript</li>
              <li>Redux</li>
              <li>Redux-Saga</li>
              <li>Vidi UI Components*</li>
              <li>Webpack</li>
              <li>AWS Amplify</li>
              <li>MDI (Icon library)</li>
            </ul>
          </div>
          <div className="md:flex-grow">
            <h3 className="text-lg underline">Back-End</h3>
            <ul className="list-disc list-inside">
              <li>AWS Sam CLI</li>
              <li>
                NodeJS 16.x
                <ul className="list-disc list-inside">
                  <li>UUID Package</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <small>* Vidi UI is a part of the same project, just split out into its own project.</small>

        <h2 className="text-xl mt-3">
          That's it?
        </h2>
        <p>Yes, but actually no!</p>
        <p className="mt-2">
          These are just the tools used to develop the front and back end.
          Let's start by listing all of the actual packages involved in making this project.
        </p>

        <ol className="list-decimal list-inside mt-2">
          <li><a className="text-underline text-purple-700" href="//github.com/vini-vici/front-end">Vici Front-End</a></li>
          <li><a className="text-underline text-purple-700" href="//github.com/vini-vici/back-end">Vici Back-End</a></li>
          <li><a href="//github.com/vini-vici/shared-infra" className="text-underline text-purple-700"> Vici Shared-Infrastructure</a></li>
          <li><a href="//github.com/vini-vici/viddi" className="text-underline text-purple-700"> Viddi UI</a></li>
        </ol>

        <h3 className="text-lg mt-3">Vicci Front-End (FE)</h3>

        <p>This repository is actually the repo you see now. It handles the pages, and it's CDK includes the necessary CloudFront and S3 assets to deploy the code.</p>

        <h3 className="text-lg mt-3">Vicci Back-End (BE)</h3>

        <p>This is the main repository for the API. It creates an API Gateway, as well as some lambda functions.</p>

        <h3 className="text-lg mt-3">Vicci Share Infrastructure</h3>

        <p>
          Both the FE and BE rely on Cognito, so the infrastructure package that creates it is separate from the FE or BE repo.
          This was done largely because the FE needs information from the BE, but the BE needs information about Cognito in order to authorize requests.
        </p>

        <p>
          Originally this code was a part of the FE package, but it was split out in order to avoid needing to build the front-end or back-end without proper values initially and then re-building them later.
        </p>

        <h3 className="text-lg mt-3">Viddi UI</h3>

        <p>
          At one point in development there were <em>a lot</em> of components in the FE repo. These components got split out into the Viddi UI components.
          The Viddi UI automates some parts of the process necessary for working with component UI, such as automatic CHANGELOG generation.
        </p>

      </div>
    </div>
  );
}