import { ErrorBoundary, Suspense } from '@suspensive/react';

import { ErrorMessage } from '../_components/error-message';
import { TeamTab } from './_components/tab';

export default function Page() {
  return (
    <div className="flex-1">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly>
          <TeamTab />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
