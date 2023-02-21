import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: false,
      retry: 1,
      retryDelay: 2_000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 8 * 60 * 1000,
    },
    mutations: {
      onSettled(data, error, variables, context) {
        console.info(data, error, variables, context);
      },
    }
  }
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReactQueryProviderProps {

}

export default function ReactQueryProvider({
  children
  // eslint-disable-next-line no-undef
}: React.PropsWithChildren<ReactQueryProviderProps>): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}