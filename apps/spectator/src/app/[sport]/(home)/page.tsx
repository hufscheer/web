import { Spinner } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from './_components/error-message';
import { SportTab } from './_components/sport-tab';
import { RecentTab } from './_components/tab';

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
          <SportTab />
          <div className="flex flex-1 px-5">
            <RecentTab />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
