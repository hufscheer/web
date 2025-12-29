'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useSuspenseTeamsSummary } from '~/api';
import { MatchHistory } from './match-history';
import { ScoreList } from './score-list';
import { TeamCard } from './team-card';
import { TeamFilter, useTeamUnits } from './team-filter';
import { useState } from 'react';
import { ScorersModal } from './score-modal';

type ModalPayload = {
  teamName: string;
  scorers: any[]; // 아래에서 실제 타입으로 바꿔도 됨
} | null;
export const TeamTab = () => {
  const { selected } = useTeamUnits();
  const { data } = useSuspenseTeamsSummary({ units: selected });

  const [modal, setModal] = useState<ModalPayload>(null);
  const open = modal !== null;
  return (
    <>
      <div className="column">
        <TeamFilter />

        <div className="column mb-5 gap-3 px-5">
          {data.map(team => (
            <TeamCard key={team.teamDetail.name}>
              <TeamCard.Header team={team.teamDetail} />
              <TeamCard.Divider />

              <TeamCard.Content>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() =>
                    setModal({
                      teamName: team.teamDetail.name,
                      scorers: team.teamDetail.topScorers,
                    })
                  }
                >
                  <TeamCard.Section title="득점왕" icon="🙋‍♂️">
                    <ErrorBoundary fallback={null}>
                      <Suspense clientOnly>
                        <ScoreList scorers={team.teamDetail.topScorers} />
                      </Suspense>
                    </ErrorBoundary>
                  </TeamCard.Section>
                </button>
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

      <ScorersModal
        open={open}
        onOpenChange={next => {
          if (!next) setModal(null);
        }}
        teamName={modal?.teamName ?? ''}
        scorers={modal?.scorers ?? []}
      />
    </>
  );
};
