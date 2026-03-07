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
  teamId: number;
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
          {data.map((team) => (
            <TeamCard key={team.teamDetail.teamId}>
              <TeamCard.Header team={team.teamDetail} />
              <TeamCard.Divider />

              <TeamCard.Content>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() =>
                    setModal({
                      teamId: team.teamDetail.teamId,
                      teamName: team.teamDetail.name,
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

      {modal && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ScorersModal
              open={open}
              onOpenChange={(next) => {
                if (!next) setModal(null);
              }}
              teamId={modal.teamId}
              teamName={modal.teamName}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};
