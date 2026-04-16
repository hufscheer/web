import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '../_components/error-message';
import { SportTab } from '../_components/sport-tab';
import { TeamTab } from './_components/tab';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <SportTab />
          <TeamTab />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
