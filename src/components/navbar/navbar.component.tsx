import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { mdiGithub } from '@mdi/js';
import { Icon } from '@mdi/react';

import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar(): React.ReactElement {
  const { t } = useTranslation();
  const user = useSelector((v: RootState) => v.cognito);
  const github = useSelector(({ github }: RootState) => github);
  return (
    <nav className="bg-gray-800 dark:bg-black text-gray-100 h-12 min-h-12 px-2 flex-shrink-0 flex items-center">
      <div className="container flex justify-between items-center">
        <div className="left-section flex items-center">
          <img src="/static/vicci-favicon.svg" style={{ height: '1.5em', display: 'inline-block', marginRight: '0.5em' }} alt="Vicci" />
          <div>
            Vicci
          </div>
        </div>
        
        <div className="flex right-section gap-2 items-center">
          <NavLink to="/" exact activeClassName="font-semibold underline">
            {t('Home')}
          </NavLink>
          <NavLink to="/about" activeClassName="font-semibold underline">
            {t('About.navbar')}
          </NavLink>
          <NavLink to="/releases" activeClassName="font-semibold underline">
            {t('Releases')}
          </NavLink>
          {
            user.preferredUsername || user.username ?
              (
                <Link to="/logout">
                  {t('Logout')}
                  <span className="text-gray-400 text-sm ml-1">
                    ({user.preferredUsername || user.username})
                  </span>
                </Link>
              ) :
              (
                <Link to="/login">{t('Login')}</Link>
              )
          }
          <a href="https://github.com/vini-vici/" target="_blank" aria-label="Go to Vini-Vici repos" title={
            github.state === 'successful' ? 
              `${github.issues} open issues, ${github.pullRequests} open PR(s)` :
              'Github'
          }>
            <Icon path={mdiGithub} size={0.75}/>
          </a>
        </div>
      </div>
    </nav>
  );
}