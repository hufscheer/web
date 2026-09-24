'use client';

import type { PropsWithChildren } from 'react';

import { ProgressProvider } from '@bprogress/next/app';
import { QueryClientProvider } from '@hcc/api-base';
import { setUnauthorizedHandler } from '@hcc/manager-api';

setUnauthorizedHandler(async () => {
  alert('로그인이 만료되었어요. 다시 로그인해주세요.');
  await fetch('/api/logout', { method: 'POST' });
  window.location.replace('/auth/login');
});

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
