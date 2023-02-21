import { Todo } from '@/components/todos/todo.component';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import config from '@/config.json';
import { useCognito } from './cognito';

export function prepareHeaders(token: string): Headers {
  const headers = new Headers();
  headers.set('authorization', `Bearer ${token}`);
  return headers;
}

export function useTodos(): UseQueryResult<Todo[]> {
  const cognito = useCognito();
  const qc = useQueryClient();
  return useQuery(
    ['fetchTodos', cognito.data?.username],
    async () => {
      const { API: url } = config;
      const headers = prepareHeaders(cognito.data.idToken);

      const response = await fetch(url, {
        headers
      }).then(res => res.json() as unknown as Todo[]);

      for (const todo of response)
        qc.setQueryData(['fetchTodos', 'todo', todo.id], todo);


      return response;
    },
    {
      enabled: cognito.data.idToken !== ''
    }
  );
}

export function useAddTodo(): UseMutationResult<Todo> {
  const cognito = useCognito();
  const qc = useQueryClient();
  return useMutation(
    ['addTodo'],
    async (todo: Partial<Todo>) => {
      const response = await fetch(
        config.API,
        {
          headers: prepareHeaders(cognito.data.idToken),
          method: 'PUT',
          body: JSON.stringify(todo),
        }
      ).then(res => res.json());
      return response;
    },
    {
      onMutate(data) {

        const current = qc.getQueryData(['fetchTodos', cognito.data?.username]) as Todo[];
        console.info('Hello??');
        qc.setQueryData(['fetchTodos', cognito.data?.username], current.concat(data as Required<Todo>));

        return {
          old: current,
        };
      },
      onSuccess(data, variables, context) {
        qc.setQueryData(['fetchTodos', cognito.data?.username], [{ ...variables, id: data }].concat(context.old));
      },
      onError(error, variables, context) {
        qc.setQueryData(['fetchTodos', cognito.data?.username], context.old);
      },
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
      }).then(res => res.ok);
      return response;
    },
    {
      onMutate(data) {
        const current = qc.getQueryData(['fetchTodos', cognito.data?.username]) as Todo[];

        qc.setQueryData(['fetchTodos', cognito.data.username], current.filter(item => item.id !== data));

        return {
          oldData: current,
        };
      },
      onError(err, v, context) {
        qc.setQueryData(['fetchTodos', cognito.data.username], context.oldData);
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
        qc.invalidateQueries(['fetchTodos', cognito.data.username]);
      },
      onMutate(todo) {
        const previousTodos = (qc.getQueryData(['fetchTodos', cognito.data?.username]) || []) as Todo[];
        qc.setQueryData(
          ['fetchTodos', cognito.data?.username],
          previousTodos.map(td => td.id === todo.id ? todo : td)
        );
        return {
          previousTodos,
        };
      },
      onError(err, newTodo, context) {
        qc.setQueryData(['fetchTodos', cognito.data?.username], context.previousTodos);
      }
    }
  );
}
