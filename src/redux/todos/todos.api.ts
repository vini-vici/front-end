import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import CONFIG from '@/config.json';
import { RootState } from '../store';

export interface Todo {
  title: string;
  description: string;
  done: boolean;
  id: string;
}

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.API,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      if (state.cognito.idToken)
        headers.set('authorization', `Bearer ${state.cognito.idToken}`);
      return headers;
    },
  }),
  tagTypes: ['Todo'],
  endpoints: builder => ({
    // Queries the items
    getTodos: builder.query<Todo[], void>({
      query: () => '/',
      providesTags: result => 
        result ? 
          [
            ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
            { type: 'Todo', id: 'LIST' }
          ] :
          [{ type: 'Todo', id: 'LIST' }]
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: body => ({
        url: '',
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }]
    }),
    updateTodo: builder.mutation<void, Pick<Todo, 'id'> & Partial<Todo>>({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
      async onQueryStarted({ id, ...rest }, { getState, dispatch, queryFulfilled }) {
        // const r = getState();
        // console.log(todosApi.util.updateQueryData('getTodos', ));
        try {
          await queryFulfilled;
        } catch(e) {
          console.error('whoop');
        }
      }
    }),
    deleteTodo: builder.mutation<void, string>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }]
    })
  })
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todosApi;