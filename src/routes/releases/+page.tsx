import { useReleases } from '@/hooks/releases';
import { toDateTimeString } from '@/util/date';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReleasesPage(): JSX.Element {
  const { t } = useTranslation();
  const releases = useReleases();
  return (
    <div className="flex-grow">
      <div className="container py-3">
        <h1 className="text-4xl font-bold mt-2">
          {t('Releases') as string}
        </h1>
        <header className="mt-2 lb-4">
          <p>
            {t('Release-description') as string}
          </p>
        </header>
        {
          releases.isSuccess && releases.data.length && releases.data.map(release => (
            <div key={`release-${release.id}`} className="release mt-2 border border-gray-300 py-2 px-4 rounded-lg shadow">
              <header>
                <h1 className="text-2xl font-semibold ">
                  {release.name}
                  <small className="ml-2 font-normal ">
                    {t('Posted at', { date: toDateTimeString(release.published_at) }) as string}
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