import React from 'react';
import { Loading } from '@vini-vici/viddi';
import { useDispatch, useSelector } from 'react-redux';

import { getReleases } from '@/redux/releases/releases.thunk';
import { RootState } from '@/redux/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toDateTimeString } from '@/util/date';
import { useTranslation } from 'react-i18next';

export default function ReleaseRoute(): React.ReactElement {
  const { releases, isSuccess, isLoading } = useSelector((v: RootState) => v.releases);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getReleases());
  }, []);

  const { t }= useTranslation();

  return (
    <div className="flex-grow pb-8">
      <div className="container">
        <h1 className="text-4xl font-bold mt-2">
          {t('Releases')}
        </h1>
        <header className="mt-2 lb-4">
          <p>
            {t('Release-description')}
          </p>
        </header>
        {isLoading && <Loading />}
        {
          isSuccess && releases.length && releases.map(release => (
            <div key={`release-${release.id}`} className="release mt-2 border border-gray-300 py-2 px-4 rounded-lg shadow">
              <header>
                <h1 className="text-2xl font-semibold ">
                  {release.name}
                  <small className="ml-2 font-normal ">
                    {t('Posted at', { date: toDateTimeString(release.published_at) })}
                  </small>
                </h1>
              </header>
              <main>
                <ReactMarkdown linkTarget="_blank" plugins={[remarkGfm]}>
                  {release.body}
                </ReactMarkdown>
              </main>
            </div>
          ))
        }
      </div>
    </div>
  );
}