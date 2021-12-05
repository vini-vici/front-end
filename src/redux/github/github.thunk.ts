import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export const getGithubIssues = createAsyncThunk(
  'issues/getIssues',
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
      issues:repo.data.open_issues,
      pullRequests: pulls.data.length
    };
  }
);

interface GithubState {
  issues: number;
  pullRequests: number;
  loading: boolean;
  state: 'initial' | 'pending' | 'failure' | 'successful'
}
const githubSlice = createSlice({
  name: 'github',
  initialState: {
    issues: 0,
    pullRequests: 0,
    loading: false,
    state: 'initial'
  } as GithubState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getGithubIssues.fulfilled, (state, action) => {
      Object.assign(state, {
        issues: action.payload.issues,
        pullRequests: action.payload.pullRequests,
        loading: false,
        state: 'successful'
      } as Partial<GithubState>);
      return state;
    });
  }
});

export default githubSlice.reducer;