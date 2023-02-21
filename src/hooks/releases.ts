import { Octokit } from '@octokit/rest';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const octokit = new Octokit();
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export function useReleases(): UseQueryResult<Awaited<ReturnType<typeof octokit['repos']['listReleases']>>['data']> {
  return useQuery(
    ['fetchReleases'],
    async () => {
      const releases = await octokit.repos.listReleases({
        owner: 'vini-vici',
        repo: 'front-end',
      });
      return releases.data;
    },
  );
}
