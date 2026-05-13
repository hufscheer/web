import type { Metadata } from 'next';

import { Spinner } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { WelcomeView } from './_components/welcome-view';

export const metadata: Metadata = { title: '학교 선택' };

export default function Page() {
  return (
    <ErrorBoundary fallback={<div className="p-5 text-center">조직 정보를 불러오지 못했어요.</div>}>
      <Suspense
        clientOnly
        fallback={
          <div className="flex min-h-dvh items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <WelcomeView />
      </Suspense>
    </ErrorBoundary>
  );
}
