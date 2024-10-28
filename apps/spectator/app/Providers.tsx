'use client';

import {
  QueryClientProvider as HccQueryClientProvider,
  ReactQueryDevtools as HccReactQueryDevtools,
} from '@hcc/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { ReactNode, useState } from 'react';

import AmplitudeContextProvider from '@/contexts/AmplitudeContext';

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
            staleTime: 1000 * 60 * 10,
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
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
        <HccReactQueryDevtools />
      </HccQueryClientProvider>
    </AmplitudeContextProvider>
  );
}
