import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

export default function AboutRoute(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="flex-grow">
      <div className="container pb-5">
        <h1 className="text-3xl font-bold mt-3">
          {t('About.About-this-project')}
        </h1>
        
        <p>
          <Trans i18nKey="About.About-description">
            This project is about showing more about the <em>architecture</em> of a larger app
            than it is about what the app <em>does</em>. For newer people it often is about how cool
            what they are working on is. This works well, except for in trying to dive into what they perceive as
            cool they miss a lot of the more minor steps.
          </Trans>
        </p>

        <h2 className="text-xl mt-3">
          {t('About.The-Author')}
        </h2>
        <p>
          {t('About.About-Author-Description')}
        </p>

        <h2 className="text-xl mt-3">
          <Trans i18nKey="About.About-Out-of-it">
            So, what do <em>we</em> get out of it?
          </Trans>
        </h2>
        <p>
          <Trans i18nKey="About.About-see-an-application">
          We see an application with quite a few components,
          unit tests, and e2e tests. As well, we get to see
          how to integrate with things like the AWS CDK,
          which builds our staging and production URLs; and AWS Cognito, which is how we handle our user login system.
          </Trans>
        </p>

        <h2 className="text-xl mt-3">
          {t('About.About-stack')}
        </h2>
        <p>
          {t('About.About-stack-description')}
        </p>
        <div className="flex flex-col md:flex-row gap-2 mt-3">
          <div className="md:flex-grow">
            <h3 className="text-lg underline">
              {t('Front-End')}
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
            <h3 className="text-lg underline">
              {t('Back-End')}
            </h3>
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
        <small>*{t('About.vidi-ui-disclaimer')}</small>

        <h2 className="text-xl mt-3">
          {t('About.thats-it')}
        </h2>
        <p>{t('About.yes-but-no')}</p>
        <p className="mt-2">
          <Trans i18nKey="About.tools">
            These are just the tools used to develop the front and back end.
            Let's start by listing all of the actual packages involved in making this project.
          </Trans>
        </p>

        <ol className="list-decimal list-inside mt-2">
          <li><a className="text-underline text-purple-700" href="//github.com/vini-vici/front-end">Vici Front-End</a></li>
          <li><a className="text-underline text-purple-700" href="//github.com/vini-vici/back-end">Vici Back-End</a></li>
          <li><a href="//github.com/vini-vici/shared-infra" className="text-underline text-purple-700">Vici Shared-Infrastructure</a></li>
          <li><a href="//github.com/vini-vici/viddi" className="text-underline text-purple-700">Viddi UI</a></li>
        </ol>

        <h3 className="text-lg mt-3">Vicci Front-End (FE)</h3>

        <p>
          <Trans i18nKey="About.about-front-end">

            This repository is actually the repo you see now. It handles the pages, and it's CDK includes the necessary CloudFront and S3 assets to deploy the code.
          </Trans>
        </p>

        <h3 className="text-lg mt-3">Vicci Back-End (BE)</h3>

        <p>
          <Trans i18nKey="About.about-back-end">
            This is the main repository for the API. It creates an API Gateway, as well as some lambda functions for basic <abbr title="Create, Read, Update, DELETE">CRUD</abbr> functionality.
          </Trans>
        </p>

        <h3 className="text-lg mt-3">Vicci Share Infrastructure</h3>

        <p>
          {t('About.about-share-infrastructure')}
        </p>

        <h3 className="text-lg mt-3">Viddi UI</h3>

        <p>
          <Trans i18nKey="About.about-viddi">
            At one point in development there were <em>a lot</em> of components in the FE repo. These components got split out into the Viddi UI components.
            The Viddi UI automates some parts of the process necessary for working with component UI, such as automatic CHANGELOG generation. Automated publishing to NPM is still <abbr title={t('work in progress')}>WIP</abbr>
          </Trans>
        </p>

        <h3 className="text-lg mt-3">Wrapping Up</h3>

        <p>
          {t('About.does-for-you')}
        </p>

        <p>
          {t('About.best-case-scenario')}
        </p>

      </div>
    </div>
  );
}