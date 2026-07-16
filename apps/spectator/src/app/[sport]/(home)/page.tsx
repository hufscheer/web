import type { Metadata } from 'next';

import { Spinner } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from './_components/error-message';
import { SportTab } from './_components/sport-tab';
import { RecentTab } from './_components/tab';

export const metadata: Metadata = { title: '홈' };

export default function Page() {
  return (
    <div className="flex flex-1 flex-col justify-between gap-3">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <SportTab />

        <div className="flex flex-1 px-5">
          <Suspense clientOnly fallback={<Spinner className="text-center" />}>
            <RecentTab />
          </Suspense>
        </div>
      </ErrorBoundary>
    </div>
  );
}
