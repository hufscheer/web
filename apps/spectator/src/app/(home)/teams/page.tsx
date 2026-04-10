import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '../_components/error-message';
import { SportTab } from '../_components/sport-tab';
import { TeamTab } from './_components/tab';

export default function Page() {
  return (
    <div className="flex-1">
      <SportTab />
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <TeamTab />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
