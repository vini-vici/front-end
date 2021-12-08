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
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
            { type: 'Todo', id: 'LIST' },
          ]
          : [{ type: 'Todo', id: 'LIST' }],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: body => ({
        url: '',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
      async onQueryStarted(todo, { queryFulfilled, dispatch }) {
        const patch = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, draft => {
            draft.unshift({
              id: 'pending',
              title: todo.title || '',
              description: todo.description || '',
              done: todo.done || false
            });
          }
          )
        );

        await queryFulfilled.catch(patch.undo);

      }
    }),
    updateTodo: builder.mutation<void, Pick<Todo, 'id'> & Partial<Todo>>({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async onQueryStarted(
        { id, ...rest },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, draft => {
            // The `draft` is Inner-wrapped and can be "mutated" like in createSlice
            const todo = draft.find(t => t.id === id);
            if (todo) {
              todo.done = rest.done;
              todo.title = rest.title;
              todo.description = rest.description;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTodo: builder.mutation<void, string>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
      // Adds optimistic removal of todos
      async onQueryStarted(id, { dispatch, queryFulfilled, }) {
        const patch = dispatch(todosApi.util.updateQueryData('getTodos', undefined, draft => {
          const index = draft.findIndex(t => t.id === id);
          draft.splice(index, 1);
        }));
        await queryFulfilled.catch(patch.undo);
      }
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
