import type { PropsWithChildren } from 'react';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { OrgGuard } from '../_components/org-guard';

export const dynamic = 'force-dynamic';

const SportLayout = ({ children }: PropsWithChildren) => (
  <>
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <OrgGuard />
      </Suspense>
    </ErrorBoundary>
    {children}
  </>
);

export default SportLayout;
