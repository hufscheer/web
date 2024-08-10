'use client';

import { QueryClientProvider, ReactQueryDevtools } from '@hcc/api';
import { ReactNode } from 'react';

import useScreenSize from '@/hooks/useScreenSize';

type ProviderProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  useScreenSize();

  return (
    <QueryClientProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
