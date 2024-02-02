import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactNode, Suspense } from 'react';

import ErrorBoundary, { FallbackProps } from '../ErrorBoundary';

type AsyncBoundaryProps = {
  errorFallback: (props: FallbackProps) => ReactNode;
  loadingFallback: ReactNode;
  children: ReactNode;
};

export default function AsyncBoundary({
  errorFallback,
  loadingFallback,
  children,
}: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={errorFallback} onReset={reset}>
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
