import { Tabs } from '@base-ui/react';
import { Spinner } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { Skeleton } from '~/components/skeleton';

import { BestScorer } from './_components/best-scorer';
import { ErrorMessage } from './_components/error-message';
import { RecentRecords } from './_components/recent-records';
import { RecentTab } from './_components/tab';

export default function Page() {
  return (
    <Tabs.Panel value="recent" className="flex h-full flex-1 flex-col justify-between gap-3 p-5">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense
          clientOnly
          fallback={
            <div className="flex flex-1 justify-center py-12">
              <Spinner />
            </div>
          }
        >
          <RecentTab />
        </Suspense>
      </ErrorBoundary>

      <div className="flex flex-col gap-3">
        <Suspense fallback={<Skeleton className="h-20" />}>
          <RecentRecords />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-32" />}>
          <BestScorer />
        </Suspense>
      </div>
    </Tabs.Panel>
  );
}
