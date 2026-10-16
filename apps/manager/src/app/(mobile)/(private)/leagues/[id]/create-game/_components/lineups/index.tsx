'use client';

import { Button } from '@hcc/ui';
import { useState } from 'react';

import type { TeamNum } from '../../constants';

import {
  CandidatesSection,
  PlayerSearchPopover,
  StartersSection,
  TeamTabs,
} from '../../../_components/lineup-ui';
import { useLineupDerived } from './use-lineup-derived';
import { useLineupSelection } from './use-lineup-selection';
import { useLineupsData } from './use-lineups';

type Props = {
  leagueId: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

export const LineupStep = ({ leagueId, onNext, onPrevious, onSubmit }: Props) => {
  const { teamBuckets, starterLimit, sportType } = useLineupsData(leagueId);

  const {
    team1Selection,
    team2Selection,
    togglePlayerState,
    toggleCaptain,
    setPlayerPosition,
    promoteCandidatesToStarter,
    flushToForm,
  } = useLineupSelection({ starterLimit });

  const { teamViews, isLineupValid, isSubmitReady } = useLineupDerived({
    team1Selection,
    team2Selection,
  });

  const [activeTab, setActiveTab] = useState<TeamNum>(1);

  const activeBucket = teamBuckets[activeTab];
  const activeView = teamViews[activeTab];
  const activeSelection = activeTab === 1 ? team1Selection : team2Selection;
  const activeTeamName = activeBucket.info?.teamName ?? '팀';

  const flushThen = (action: () => void) => () => {
    flushToForm();
    action();
  };

  return (
    <div className="flex h-full flex-col">
      <TeamTabs
        activeTab={activeTab}
        teamNames={{
          1: teamBuckets[1].info?.teamName ?? '팀 1',
          2: teamBuckets[2].info?.teamName ?? '팀 2',
        }}
        onSelect={setActiveTab}
      />

      <div className="mt-4 flex-1 overflow-y-auto">
        <PlayerSearchPopover
          key={activeTab}
          players={activeBucket.players}
          selection={activeSelection}
          sportType={sportType}
          onToggleState={(playerId, state) => togglePlayerState(activeTab, playerId, state)}
          onSetPosition={(playerId, position) => setPlayerPosition(activeTab, playerId, position)}
        />

        <StartersSection
          teamName={activeTeamName}
          view={activeView}
          players={activeBucket.players}
          starterLimit={starterLimit}
          onToggleCaptain={(playerId) => toggleCaptain(activeTab, playerId)}
          onDemote={(playerId) => togglePlayerState(activeTab, playerId, 'CANDIDATE')}
        />

        <CandidatesSection
          teamName={activeTeamName}
          view={activeView}
          players={activeBucket.players}
          canPromote={activeView.starters.length < starterLimit}
          onPromoteAll={() => promoteCandidatesToStarter(activeTab)}
          onPromote={(playerId) => togglePlayerState(activeTab, playerId, 'STARTER')}
        />
      </div>

      <StepActions
        isLineupValid={isLineupValid}
        isSubmitReady={isSubmitReady}
        onPrevious={flushThen(onPrevious)}
        onNext={flushThen(onNext)}
        onSubmit={flushThen(onSubmit)}
      />
    </div>
  );
};

/* ----- 생성 전용 조각 ----- */

type StepActionsProps = {
  isLineupValid: boolean;
  isSubmitReady: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

const StepActions = ({
  isLineupValid,
  isSubmitReady,
  onPrevious,
  onNext,
  onSubmit,
}: StepActionsProps) => (
  <div className="flex-shrink-0 border-t border-gray-200 bg-white pt-4">
    <div className="column gap-2">
      <div className="flex gap-2">
        <Button
          type="button"
          className="flex-1"
          size="lg"
          color="primary"
          variant="subtle"
          onClick={onPrevious}
        >
          이전 단계
        </Button>
        <Button
          type="button"
          className="flex-1"
          size="lg"
          color="primary"
          variant="subtle"
          disabled={!isLineupValid}
          onClick={onNext}
        >
          다음 단계
        </Button>
      </div>
      <Button
        type="button"
        className="w-full"
        size="lg"
        color="black"
        disabled={!isSubmitReady}
        onClick={onSubmit}
      >
        경기 생성
      </Button>
    </div>
  </div>
);
