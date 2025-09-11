'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { QueryClientProvider } from '@hcc/api-base';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider>
      <NuqsAdapter>
        <ProgressProvider
          color="var(--color-primary-500)"
          options={{ showSpinner: false }}
          shallowRouting={false}
        >
          {children}
        </ProgressProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
