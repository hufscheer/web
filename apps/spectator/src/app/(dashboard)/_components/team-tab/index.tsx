'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useSuspenseTeams } from '~/api';
import { MatchHistory } from './match-history';
import { ScoreList } from './score-list';
import { TeamCard } from './team-card';
import { TeamFilter, useTeamUnits } from './team-filter';

export const TeamTab = () => {
  const { selected } = useTeamUnits();
  const { data } = useSuspenseTeams({ units: selected });

  return (
    <div className="column h-full">
      <TeamFilter />

      <div className="column mb-5 flex-1 gap-3 overflow-y-auto px-5">
        {data.map(team => (
          <TeamCard key={team.id}>
            <TeamCard.Header team={team} />
            <TeamCard.Divider />

            <TeamCard.Content>
              <TeamCard.Section title="득점왕" icon="🙋‍♂️">
                <ErrorBoundary fallback={null}>
                  <Suspense clientOnly>
                    <ScoreList teamId={team.id} />
                  </Suspense>
                </ErrorBoundary>
              </TeamCard.Section>

              <TeamCard.Section title="최근 경기" icon="💥">
                <ErrorBoundary fallback={null}>
                  <Suspense clientOnly>
                    <MatchHistory teamId={team.id} teamName={team.name} />
                  </Suspense>
                </ErrorBoundary>
              </TeamCard.Section>
            </TeamCard.Content>
          </TeamCard>
        ))}
      </div>
    </div>
  );
};
