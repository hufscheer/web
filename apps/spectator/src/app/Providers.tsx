'use client';

import { ProgressProvider } from '@bprogress/next/app';
import {
  QueryClientProvider as HccQueryClientProvider,
  ReactQueryDevtools as HccReactQueryDevtools,
} from '@hcc/api';
import { theme } from '@hcc/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
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
    <HccQueryClientProvider>
      <QueryClientProvider client={queryClient}>
        <ProgressProvider
          height="2px"
          color={theme.colors.blue600}
          options={{ showSpinner: false }}
          shallowRouting={false}
        >
          {children}
        </ProgressProvider>
      </QueryClientProvider>
      <HccReactQueryDevtools />
    </HccQueryClientProvider>
  );
};

export default Providers;
