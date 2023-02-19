import { useQuery } from '@tanstack/react-query';
import { Octokit } from '@octokit/rest';
const octokit = new Octokit();
export default function useGithub(suspense = true) {
  return useQuery(
    ['fetch', 'github'],
    async () => {
      const repo = await octokit.repos.get({
        owner: 'vini-vici',
        repo: 'front-end'
      });
      const pulls = await octokit.pulls.list({
        owner: 'vini-vici',
        repo: 'front-end'
      });
      return {
        issues: repo.data.open_issues || 0,
        pullRequests: pulls.data.length || 0
      };
    },
    {
      suspense
    }
  );
}