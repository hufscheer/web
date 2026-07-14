import type { Metadata } from 'next';

import { Spinner } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '~/app/org/[orgId]/_components/error-message';

import { RecentTab } from './_components/tab';

export const metadata: Metadata = { title: '홈' };

export default function Page() {
  return (
    <div className="flex flex-1 flex-col justify-between gap-3">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense
          clientOnly
          fallback={
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          }
        >
          <div className="flex flex-1 px-5">
            <RecentTab />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
