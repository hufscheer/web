import type { Metadata } from 'next';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '../../../_components/error-message';
import { PreviousLeagues } from './_components/previous-leagues';

export const metadata: Metadata = { title: '대회' };

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <PreviousLeagues />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
