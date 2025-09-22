'use client';

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

            <LeagueCard.Teams leagueId={league.leagueId} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ErrorBoundary fallback={null}>
                <Suspense fallback={null} clientOnly>
                  <LeagueCard.Scorers leagueId={league.leagueId} />
                </Suspense>
              </ErrorBoundary>

              <ErrorBoundary fallback={null}>
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
