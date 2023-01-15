import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export const getReleases = createAsyncThunk(
  'releases/get',
  async () => {
    const releases = await octokit.repos.listReleases({
      owner: 'vini-vici',
      repo: 'front-end'
    });
    return releases;
  }
);

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

interface ReleaseState {
  releases: Awaited<ReturnType<typeof octokit.repos.listReleases>>['data'];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  status: 'initial' | 'pending' | 'successful' | 'failure'
}

export const releaseSlice = createSlice({
  name: 'releases',
  initialState: {
    releases: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    status: 'initial'
  } as ReleaseState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getReleases.fulfilled, (state, action) => {
      state.releases = action.payload.data;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.status = 'successful';
      return state;
    });
    builder.addCase(getReleases.rejected, state => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.status = 'failure';
    });
    builder.addCase(getReleases.pending, state => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.status = 'pending';
    });
  }
});