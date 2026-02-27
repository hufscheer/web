'use client';

import { colors, Spinner, Typography } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useSuspenseLeagues } from '~/api';
import { LeagueCard } from './league-card';
import { YearFilter } from './year-filter';

interface Props {
  year: number;
}

export const PreviousTab = ({ year }: Props) => {
  return (
    <div className="column" key={year}>
      <YearFilter year={year} />

      <ErrorBoundary
        fallback={
          <div className="p-10 text-center text-gray-400">
            데이터가 없거나 불러오는 중 오류가 발생했습니다
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="flex h-40 w-full items-center justify-center">
              <Spinner size="md" color="primary" />
            </div>
          }
        >
          <LeagueList year={year} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const LeagueList = ({ year }: { year: number }) => {
  const { data } = useSuspenseLeagues({ year, size: 50 });

  return (
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

          <div className="column w-full gap-4">
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
                    리그 통계 데이터가 집계되지 않았어요
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
  );
};
