import type { Metadata } from 'next';

import { dehydrate, getQueryClient, HydrationBoundary } from '@hcc/api-base';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import { fetchLeagueRecentGames } from '~/api';
import { ErrorMessage } from '~/app/(sports)/_components/error-message';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

import { RecentTabSkeleton } from './_components/recent-tab-skeleton';
import { RecentTab } from './_components/tab';

export const metadata: Metadata = { title: '홈' };

type Props = {
  params: Promise<{ sport: string }>;
  searchParams: Promise<{ org?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const qc = getQueryClient();
  const [{ sport: _sport }, { org }] = await Promise.all([params, searchParams]);

  const sport = normalizeSportParam(_sport) ?? DEFAULT_SPORT;
  const organizationId = org ? Number(org) : undefined;
  if (!organizationId) {
    redirect('/welcome');
  }

  await fetchLeagueRecentGames({ sportType: sport, organizationId });

  return (
    <div className="flex flex-1 flex-col justify-between gap-3">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <HydrationBoundary state={dehydrate(qc)}>
          <Suspense fallback={<RecentTabSkeleton />}>
            <div className="flex flex-1 px-5">
              <RecentTab initialOrganizationId={organizationId} />
            </div>
          </Suspense>
        </HydrationBoundary>
      </ErrorBoundary>
    </div>
  );
}
