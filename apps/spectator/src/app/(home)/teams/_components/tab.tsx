'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useState } from 'react';

import { useSuspenseTeamsSummary } from '~/api';
import { useSportType } from '~/hooks/useSportType';

import { MatchHistory } from './match-history';
import { ScoreList } from './score-list';
import { ScorersModal } from './score-modal';
import { TeamCard } from './team-card';
import { TeamFilter, useTeamUnits } from './team-filter';

type ModalPayload = {
  teamName: string;
  teamId: number;
} | null;

export const TeamTab = () => {
  const { selected } = useTeamUnits();
  const { sport } = useSportType();
  const { data } = useSuspenseTeamsSummary({ units: selected, sportType: sport });
  const filteredData = data.filter((team) => team.teamDetail.sportType === sport);

  const [modal, setModal] = useState<ModalPayload>(null);
  const open = modal !== null;
  return (
    <>
      <div className="column">
        <TeamFilter />

        <div className="column mb-5 gap-3 px-5">
          {filteredData.map((team) => (
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
