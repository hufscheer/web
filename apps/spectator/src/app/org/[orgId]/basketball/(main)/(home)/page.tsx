import type { Metadata } from 'next';

import { dehydrate, getQueryClient, HydrationBoundary } from '@hcc/api-base';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import { fetchLeagueRecentGames } from '~/api';
import { ErrorMessage } from '~/app/org/[orgId]/_components/error-message';

import { SPORT_TYPE } from '../../_constants';
import { RecentTabSkeleton } from './_components/recent-tab-skeleton';
import { RecentTab } from './_components/tab';

export const metadata: Metadata = { title: '홈' };

type Props = {
  params: Promise<{ orgId?: string }>;
};

export default async function Page({ params }: Props) {
  const qc = getQueryClient();
  const orgId = (await params).orgId;

  const organizationId = orgId ? Number(orgId) : undefined;
  if (!organizationId) {
    redirect('/welcome');
  }

  await fetchLeagueRecentGames({ sportType: SPORT_TYPE, organizationId });

  return (
    <div className="flex flex-1 flex-col justify-between gap-3">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <HydrationBoundary state={dehydrate(qc)}>
          <Suspense fallback={<RecentTabSkeleton />}>
            <div className="flex flex-1 px-5">
              <RecentTab />
            </div>
          </Suspense>
        </HydrationBoundary>
      </ErrorBoundary>
    </div>
  );
}
