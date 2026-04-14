'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { useSuspenseLeagues } from '~/api';
import { Skeleton } from '~/components/skeleton';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { useSportType } from '~/hooks/useSportType';

import { EmptyLeague } from '../../_components/empty-league';
import * as LeagueCard from './league-card';

interface Props {
  year: number;
}

export const LeagueCardList = ({ year }: Props) => {
  const { sport } = useSportType();
  const { organizationId } = useOrganizationId();
  const { data } = useSuspenseLeagues({
    year,
    size: 50,
    sportType: sport,
    ...(organizationId !== null && { organizationId }),
  });

  return (
    <div className="column gap-3 pb-5">
      {data.map((league) => (
        <LeagueCard.Root league={league} key={league.leagueId}>
          <LeagueCard.Header />

          <LeagueCard.Divider />

          <ErrorBoundary fallback={({ reset }) => <StatisticsErrorFallback reset={reset} />}>
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

const StatisticsErrorFallback = ({ reset }: { reset: () => void }) => {
  return (
    <div>
      <Typography
        className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
        fontSize={13}
        color={colors.neutral500}
        weight="medium"
      >
        리그 통계 데이터가 집계되지 않았어요.
      </Typography>

      <button type="button" onClick={reset} className="center-y gap-1 text-sm text-blue-500">
        다시 시도하기
        <ChevronForwardIcon width={12} height={12} />
      </button>
    </div>
  );
};
