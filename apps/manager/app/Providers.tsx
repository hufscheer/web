'use client';

import { QueryClientProvider, ReactQueryDevtools } from '@hcc/api';
import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

import useScreenSize from '@/hooks/useScreenSize';
import { mantineTheme } from '@/styles/theme';

type ProviderProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  useScreenSize();

  return (
    <QueryClientProvider>
      <MantineProvider theme={mantineTheme}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
