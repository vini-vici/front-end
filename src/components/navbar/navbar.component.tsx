import React from 'react';
import { mdiGithub, mdiMenu } from '@mdi/js';
import { Icon } from '@mdi/react';
import { DomClasses as Dc } from '@vini-vici/viddi';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCognito } from '@/hooks/cognito';
import useGithub from '@/hooks/github';
import NavLink from '../navlink/navlink.component';

export default function Navbar(): React.ReactElement {
  const { t } = useTranslation();
  const [forceShow, updateForceShow] = React.useState(false);
  const cognito = useCognito(false);
  const github = useGithub(false);

  const classes = new Dc('flex-grow md:flex-grow-0 md:flex-row w-full md:w-auto hidden flex-col items-center pb-2 md:pb-0 md:gap-2 md:flex');
  if (forceShow) classes.remove('hidden').add('flex');

  return (
    <nav className="bg-gray-800 dark:bg-black text-gray-100 md:h-full md:max-h-12 py-4 md:px-2 flex-shrink-0 flex items-center">
      <div className="container flex justify-between items-center flex-wrap md:flex-grow">
        <div className="left-section flex items-center flex-shrink-0">
          <img src="/static/vicci-favicon.svg" style={{ height: '1.5em', display: 'inline-block', marginRight: '0.5em' }} alt="Vicci" />
          <div>
            <Link to="/">Vicci</Link>
          </div>
        </div>

        <div
          className="block md:hidden flex-shrink-0"
          onClick={() => updateForceShow(!forceShow)}
        >
          <Icon path={mdiMenu} size={1} />
        </div>

        <div className={classes.toString()}>
          <NavLink to="/" activeClassName="font-semibold underline">
            {t('Home')}
          </NavLink>
          <NavLink to="/about" activeClassName="font-semibold underline">
            {t('About.navbar')}
          </NavLink>
          <NavLink to="/releases" activeClassName="font-semibold underline">
            {t('Releases')}
          </NavLink>
          <NavLink to="/user" activeClassName="font-semibold underline">Profile</NavLink>
          {
            cognito.data?.preferredUsername || cognito.data?.username ?
              (
                <Link to="/logout">
                  {t('Logout')}
                  <span className="text-gray-400 text-sm ml-1">
                    ({cognito.data.preferredUsername || cognito.data.username})
                  </span>
                </Link>
              ) :
              (
                <Link to="/login">{t('Login')}</Link>
              )
          }
          <a href="https://github.com/vini-vici/" target="_blank" aria-label="Go to Vini-Vici repos" title={
            github.isSuccess ?
              `${github.data.issues} open issues, ${github.data.pullRequests} open PR(s)` :
              'Github'
          }>
            <Icon path={mdiGithub} size={0.75} />
          </a>
        </div>
      </div>
    </nav>
  );
}