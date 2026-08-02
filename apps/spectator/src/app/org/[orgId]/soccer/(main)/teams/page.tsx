import type { Metadata } from 'next';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '../../../_components/error-message';
import { TeamTab } from './_components/tab';

export const metadata: Metadata = { title: '팀' };

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <TeamTab />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
