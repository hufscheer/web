import { Tabs } from '@base-ui/react';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from './_components/error-message';
import { RecentTab } from './_components/tab';

export default function Page() {
  return (
    <Tabs.Panel value="recent" className="flex-1" keepMounted>
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <RecentTab />
        </Suspense>
      </ErrorBoundary>
    </Tabs.Panel>
  );
}
