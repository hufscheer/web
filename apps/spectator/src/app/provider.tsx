'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { QueryClientProvider } from '@hcc/api-base';
import type { PropsWithChildren } from 'react';

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider>
      <ProgressProvider
        color="var(--color-primary-500)"
        options={{ showSpinner: false }}
        shallowRouting={false}
      >
        {children}
      </ProgressProvider>
    </QueryClientProvider>
  );
};
