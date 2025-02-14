'use client';
import {
  QueryClientProvider as HccQueryClientProvider,
  ReactQueryDevtools as HccReactQueryDevtools,
} from '@hcc/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

import AmplitudeContextProvider from '@/contexts/AmplitudeContext';

const Provider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
            staleTime: 1000 * 60,
            retry: 0,
          },
        },
      }),
  );

  return (
    <AmplitudeContextProvider>
      <HccQueryClientProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <HccReactQueryDevtools />
      </HccQueryClientProvider>
    </AmplitudeContextProvider>
  );
};

export default Provider;
