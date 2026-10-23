'use client';

import type { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@hcc/api-base';

export const Provider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};
