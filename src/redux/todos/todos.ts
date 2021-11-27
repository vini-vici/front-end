import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from './todos.reducer';
import CONFIG from '@/config.json';
import { RootState } from '../store';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.API,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      if (state.auth.token)
        headers.set('authorization', 'Bearer '+state.auth.token)
      return headers;
    },

  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    // Queries the items
    getTodos: builder.query<Todo[], void>({
      query: () => '/',
      providesTags: (result) => 
        result ? 
          [
            ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
            { type: 'Todo', id: 'LIST'}
          ] :
          [{ type: 'Todo', id: 'LIST'}]
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: '',
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST'}]
    }),
    updateTodo: builder.mutation<void, Pick<Todo, 'id'> & Partial<Todo>>({
      query: ({id, ...rest}) => ({
        url: `/${id}`,
        method: 'POST',
        body: rest,
      })
    })
  })
});

export const { useGetTodosQuery, useAddTodoMutation } = todosApi;