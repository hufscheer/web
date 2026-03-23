import { Tabs } from '@base-ui/react';
import { Spinner } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from './_components/error-message';
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
    </Tabs.Panel>
  );
}
