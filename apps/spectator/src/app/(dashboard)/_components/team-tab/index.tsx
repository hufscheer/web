'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useSuspenseTeamsSummary } from '~/api';
import { MatchHistory } from './match-history';
import { ScoreList } from './score-list';
import { TeamCard } from './team-card';
import { TeamFilter, useTeamUnits } from './team-filter';

export const TeamTab = () => {
  const { selected } = useTeamUnits();
  const { data } = useSuspenseTeamsSummary({ units: selected });

  return (
    <div className="column">
      <TeamFilter />

      <div className="column mb-5 gap-3 px-5">
        {data.map(team => (
          <TeamCard key={team.teamDetail.name}>
            <TeamCard.Header team={team.teamDetail} />
            <TeamCard.Divider />

            <TeamCard.Content>
              <TeamCard.Section title="득점왕" icon="🙋‍♂️">
                <ErrorBoundary fallback={null}>
                  <Suspense clientOnly>
                    <ScoreList scorers={team.teamDetail.topScorers} />
                  </Suspense>
                </ErrorBoundary>
              </TeamCard.Section>

              <TeamCard.Section title="최근 경기" icon="💥">
                <ErrorBoundary fallback={null}>
                  <Suspense clientOnly>
                    <MatchHistory games={team.recentGames} teamName={team.teamDetail.name} />
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
