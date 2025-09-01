'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useSuspenseTeams } from '~/api';
import { TeamCard } from './team-card';
import { TeamFilter } from './team-filter';
import { useTeamUnits } from './useTeamUnits';

export const TeamTab = () => {
  const { selected } = useTeamUnits();
  const { data } = useSuspenseTeams({ units: selected });

  return (
    <div className="column h-full">
      <TeamFilter />

      <div className="column flex-1 gap-3 overflow-y-auto px-5">
        {data.map(team => (
          <ErrorBoundary key={team.id} fallback={null}>
            <Suspense clientOnly>
              <TeamCard team={team} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
};
