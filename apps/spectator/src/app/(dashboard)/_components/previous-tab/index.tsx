'use client';

import { colors, Typography } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useSuspenseLeagues } from '~/api';
import { LeagueCard } from './league-card';
import { YearFilter } from './year-filter';

interface Props {
  year: number;
}

export const PreviousTab = ({ year }: Props) => {
  const { data } = useSuspenseLeagues({ year, leagueProgress: 'FINISHED', size: 50 });

  return (
    <div className="column">
      <YearFilter year={year} />

      <div className="column gap-3 px-5 pb-5">
        {data.map(league => (
          <LeagueCard key={league.leagueId}>
            <LeagueCard.Header league={league} />

            <LeagueCard.Divider />

            <ErrorBoundary fallback={null}>
              <Suspense fallback={null} clientOnly>
                <LeagueCard.Teams leagueId={league.leagueId} />
              </Suspense>
            </ErrorBoundary>

            <div className="grid grid-cols-2 gap-4">
              <ErrorBoundary fallback={null}>
                <Suspense fallback={null} clientOnly>
                  <LeagueCard.Scorers leagueId={league.leagueId} />
                </Suspense>
              </ErrorBoundary>

              <ErrorBoundary
                fallback={
                  <div className="center-y rounded-md bg-gray-50 p-3">
                    <Typography
                      className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                      fontSize={13}
                      color={colors.neutral500}
                      weight="medium"
                    >
                      리그 통계 데이터가 집계되지 않았어요.
                    </Typography>
                  </div>
                }
              >
                <Suspense fallback={null} clientOnly>
                  <LeagueCard.Statistics leagueId={league.leagueId} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </LeagueCard>
        ))}
      </div>
    </div>
  );
};
