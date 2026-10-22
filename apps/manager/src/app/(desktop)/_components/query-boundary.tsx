'use client';

import type { ReactNode } from 'react';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorState } from './error-state';
import { PageSkeleton } from './skeleton';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

export const QueryBoundary = ({ children, fallback = <PageSkeleton /> }: Props) => (
  <ErrorBoundary fallback={({ error }) => <ErrorState error={error} />}>
    <Suspense clientOnly fallback={fallback}>
      {children}
    </Suspense>
  </ErrorBoundary>
);
