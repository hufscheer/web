'use client';

import { colors, Typography } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useParams } from 'next/navigation';

import type { SportType } from '~/api/types';

import { useSuspenseLeagues } from '~/api';
import { Skeleton } from '~/components/skeleton';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

import { EmptyLeague } from '../../_components/empty-league';
import * as LeagueCard from './league-card';

interface Props {
  year: number;
}

export const LeagueCardList = ({ year }: Props) => {
  const params = useParams<{ sport: string }>();
  const sport: SportType = normalizeSportParam(params.sport) ?? DEFAULT_SPORT;
  const { organizationId } = useOrganizationId();
  const { data } = useSuspenseLeagues({
    year,
    size: 50,
    sportType: sport,
    ...(organizationId !== null && { organizationId }),
  });

  if (data.length === 0) return <EmptyLeague sport={sport} />;

  return (
    <div className="column gap-3 pb-5">
      {data.map((league) => (
        <LeagueCard.Root league={league} sportType={sport} key={league.leagueId}>
          <LeagueCard.Header />

          <LeagueCard.Divider />

          <ErrorBoundary fallback={() => <StatisticsErrorFallback />}>
            <Suspense fallback={<StatisticsSkeleton />} clientOnly>
              <LeagueCard.Teams />

              <div className="column w-full gap-4">
                <LeagueCard.Scorers limit={3} />
                <LeagueCard.Statistics />
              </div>
            </Suspense>
          </ErrorBoundary>
        </LeagueCard.Root>
      ))}
    </div>
  );
};

const StatisticsSkeleton = () => {
  return (
    <div className="column w-full gap-4">
      <Skeleton className="h-10" />
      <Skeleton className="h-32" />
    </div>
  );
};

const StatisticsErrorFallback = () => {
  return (
    <div>
      <Typography
        className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
        fontSize={13}
        color={colors.neutral500}
        weight="medium"
      >
        아직 경기 기록이 없어요
      </Typography>
    </div>
  );
};
