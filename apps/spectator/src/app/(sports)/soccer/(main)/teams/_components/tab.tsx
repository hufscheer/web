'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useState } from 'react';

import type { SportType } from '~/api/types';
import type { TeamUnitType } from '~/api/types/teams';

import { useSuspenseTeamsSummary } from '~/api';
import { useOrganizationId } from '~/hooks/useOrganizationId';

import { SPORT_TYPE } from '../../../_constants';
import { EmptyTeam } from './empty-team';
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
  const { isReady, organizationId } = useOrganizationId();
  const [modal, setModal] = useState<ModalPayload>(null);

  const sport: SportType = SPORT_TYPE;

  const { data } = useSuspenseTeamsSummary({
    units: selected as TeamUnitType[],
    sportType: sport,
    ...(isReady && { organizationId }),
  });

  if (!isReady) return null;
  const filteredData = data.filter((team) => team.teamDetail.sportType === sport);

  const open = modal !== null;
  return (
    <>
      <div className="column flex-1">
        <TeamFilter sport={sport} />

        <div
          className={
            filteredData.length === 0 ? 'flex flex-1 flex-col px-5' : 'column mb-5 gap-3 px-5'
          }
        >
          {filteredData.length === 0 && <EmptyTeam sport={sport} />}
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
                        <ScoreList scorers={team.teamDetail.topScorers} sport={sport} />
                      </Suspense>
                    </ErrorBoundary>
                  </TeamCard.Section>
                </button>
                <TeamCard.Section title="최근 경기" icon="💥">
                  <ErrorBoundary fallback={null}>
                    <Suspense clientOnly>
                      <MatchHistory
                        games={team.recentGames}
                        teamName={team.teamDetail.name}
                        sport={sport}
                      />
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
              sport={sport}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};
