import { Octokit } from '@octokit/rest';
import { useQuery } from '@tanstack/react-query';

const octokit = new Octokit();

export default function useGithub(suspense = false) {
  return useQuery(
    ['fetchGithub'],
    async () => {
      const repo = await octokit.repos.get({
        owner: 'vini-vici',
        repo: 'front-end'
      });

      const pulls = await octokit.pulls.list({
        owner: 'vini-vici',
        repo: 'front-end'
      });
      return  {
        issues: repo.data.open_issues_count,
        pullRequests: pulls.data.length,
      };
    },
    {
      suspense
    }
  );
}