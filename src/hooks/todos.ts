import { Todo } from '@/redux/todos/todos.api';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import config from '@/config.json';
import { useCognito } from './cognito';

export function prepareHeaders(token: string): Headers {
  const headers = new Headers();
  headers.set('authorization', `Bearer ${token}`);
  // headers.set('Access-Control-Allow-Origin', '"*"');
  return headers;
}

export function useTodos(): UseQueryResult<Todo[]> {
  const cognito = useCognito();
  const qc = useQueryClient();
  return useQuery(
    ['fetchTodos'],
    async () => {
      const { API: url } = config;
      const headers = prepareHeaders(cognito.data.idToken);

      const response = await fetch(url, {
        headers
      }).then(res => res.json() as unknown as Todo[]);

      for (const todo of response)
        qc.setQueryData(['fetchTodos', todo.id], todo);


      return response;
    },
    {
      enabled: cognito.isSuccess && cognito.data.idToken !== ''
    }
  );
}

export function useAddTodo(): UseMutationResult<Todo> {
  const cognito = useCognito();
  const qc = useQueryClient();
  return useMutation(
    ['addTodo'],
    async (todo: Partial<Todo>) => {
      const response = fetch(
        config.API,
        {
          headers: prepareHeaders(cognito.data.idToken),
          method: 'PUT',
          body: JSON.stringify(todo),
        }
      ).then(res => res.json());
      return response as unknown as Todo;
    },
    {
      onSuccess() {
        qc.invalidateQueries(['fetchTodos']);
      }
    }
  );
}

export function useRemoveTodo(): UseMutationResult<boolean> {
  const cognito = useCognito();
  const qc = useQueryClient();
  return useMutation(
    ['removeTodo'],
    async (id: string) => {
      const response = await fetch(`${config.API}/${id}`, {
        headers: prepareHeaders(cognito.data.idToken),
        method: 'DELETE'
      }).then(res => res.json());
      return response;
    },
    {
      onSuccess() {
        qc.invalidateQueries(['fetchTodos']);
      }
    }
  );
}

type RequiredKeys<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;

export function useUpdateTodo(): UseMutationResult<boolean, unknown, RequiredKeys<Todo, 'id'>> {
  const cognito = useCognito();
  const qc = useQueryClient();
  return useMutation(
    ['updateTodo'],
    async ({ id, ...rest }: RequiredKeys<Todo, 'id'>) => {
      await fetch(`${config.API}/${id}`,
        {
          headers: prepareHeaders(cognito.data.idToken),
          method: 'POST',
          body: JSON.stringify(rest)
        }).then(res => res.json());
      return true;
    },
    {
      onSuccess() {
        qc.invalidateQueries(['fetchTodos']);
      }
    }
  );
}
