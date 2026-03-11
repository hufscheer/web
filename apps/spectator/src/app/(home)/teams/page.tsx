import { Tabs } from '@base-ui/react';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '../_components/error-message';
import { TeamTab } from './_components/tab';

export default function Page() {
  return (
    <Tabs.Panel value="teams" className="flex-1" keepMounted>
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <TeamTab />
        </Suspense>
      </ErrorBoundary>
    </Tabs.Panel>
  );
}
