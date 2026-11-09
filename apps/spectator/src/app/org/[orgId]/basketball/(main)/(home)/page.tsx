import type { Metadata } from 'next';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import { ErrorMessage } from '~/app/org/[orgId]/_components/error-message';
import { InstallGuidePopup } from '~/app/org/[orgId]/_components/install-guide-popup';

import { RecentTabSkeleton } from './_components/recent-tab-skeleton';
import { RecentTab } from './_components/tab';

export const metadata: Metadata = { title: '홈' };

type Props = {
  params: Promise<{ orgId?: string }>;
};

/**
 * 최근 경기는 서버에서 미리 넣지 않고 클라이언트가 가져온다. 페이지를 캐시(ISR)해도 점수가 늘 최신이고,
 * 같은 학교의 HTML 이 늘 같아 다시 만들어도 ISR 쓰기가 생기지 않는다
 */
export default async function Page({ params }: Props) {
  const orgId = (await params).orgId;

  const organizationId = orgId ? Number(orgId) : undefined;
  if (!organizationId) {
    redirect('/welcome');
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-3">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense clientOnly fallback={<RecentTabSkeleton />}>
          <div className="flex flex-1 px-5">
            <RecentTab />
          </div>
        </Suspense>
      </ErrorBoundary>
      <InstallGuidePopup />
    </div>
  );
}
