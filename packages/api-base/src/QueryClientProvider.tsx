'use client';

import {
  QueryClientProvider as BaseQueryClientProvider,
  QueryClient,
  type QueryClientConfig,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren<{
  config?: QueryClientConfig;
}>;

const defaultConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: 1000 * 60,
      retry: 0,
    },
  },
};

export const QueryClientProvider = ({ children, config }: Props) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const [queryClient] = useState(() => new QueryClient(mergedConfig));

  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </BaseQueryClientProvider>
  );
};
