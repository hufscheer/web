'use client';

import { Button, Input, Typography } from '@hcc/ui';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { TeamNum } from '../../constants';
import type { TeamLineupView } from './use-lineup-derived';
import type { TeamBucket, TeamPlayer } from './use-lineups';

import { useLineupDerived } from './use-lineup-derived';
import {
  type LineupState,
  type PlayerSelectionState,
  useLineupSelection,
} from './use-lineup-selection';
import { useLineupsData } from './use-lineups';

type Props = {
  leagueId: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

export const LineupStep = ({ leagueId, onNext, onPrevious, onSubmit }: Props) => {
  const { teamBuckets, starterLimit } = useLineupsData(leagueId);

  const {
    team1Selection,
    team2Selection,
    togglePlayerState,
    toggleCaptain,
    promoteCandidatesToStarter,
    flushToForm,
  } = useLineupSelection({ starterLimit });

  const { teamViews, isLineupValid, isSubmitReady } = useLineupDerived({
    team1Selection,
    team2Selection,
  });

  const [activeTab, setActiveTab] = useState<TeamNum>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const activeBucket = teamBuckets[activeTab];
  const activeView = teamViews[activeTab];
  const activeSelection = activeTab === 1 ? team1Selection : team2Selection;
  const activeTeamName = activeBucket.info?.teamName ?? '팀';

  const filteredPlayers = useMemo(
    () => filterPlayers(activeBucket.players, searchQuery),
    [activeBucket.players, searchQuery],
  );

  const changeTab = (tab: TeamNum) => {
    setActiveTab(tab);
    setSearchQuery('');
  };

  const flushThen = (action: () => void) => () => {
    flushToForm();
    action();
  };

  return (
    <div className="flex h-full flex-col">
      <TeamTabs activeTab={activeTab} teamBuckets={teamBuckets} onSelect={changeTab} />

      <div className="mt-4 flex-1 overflow-y-auto">
        <LineupStatus teamName={activeTeamName} view={activeView} starterLimit={starterLimit} />

        <PlayerSearchBar value={searchQuery} onChange={setSearchQuery} />

        <PlayerList
          players={filteredPlayers}
          selection={activeSelection}
          onToggleState={(playerId, state) => togglePlayerState(activeTab, playerId, state)}
          onToggleCaptain={(playerId) => toggleCaptain(activeTab, playerId)}
        />

        <CandidatesSection
          teamName={activeTeamName}
          view={activeView}
          players={activeBucket.players}
          canPromote={activeView.starters.length < starterLimit}
          onPromoteAll={() => promoteCandidatesToStarter(activeTab)}
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

/* ----- pieces ----- */

type TeamTabsProps = {
  activeTab: TeamNum;
  teamBuckets: Record<TeamNum, TeamBucket>;
  onSelect: (tab: TeamNum) => void;
};

const TeamTabs = ({ activeTab, teamBuckets, onSelect }: TeamTabsProps) => (
  <div className="rounded-xl bg-neutral-100 p-1">
    <div className="flex">
      {([1, 2] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          className={twMerge(
            'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
            activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500',
          )}
          onClick={() => onSelect(tab)}
        >
          {teamBuckets[tab].info?.teamName ?? `팀 ${tab}`}
        </button>
      ))}
    </div>
  </div>
);

type LineupStatusProps = {
  teamName: string;
  view: TeamLineupView;
  starterLimit: number;
};

const LineupStatus = ({ teamName, view, starterLimit }: LineupStatusProps) => (
  <div className="flex items-baseline justify-between">
    <Typography weight="semibold">{teamName} - 선발</Typography>
    <span className="text-xs text-neutral-500">
      {view.starters.length}/{starterLimit}명 · 주장 {view.captain ? '✓' : '✗'}
    </span>
  </div>
);

type PlayerSearchBarProps = {
  value: string;
  onChange: (v: string) => void;
};

const PlayerSearchBar = ({ value, onChange }: PlayerSearchBarProps) => (
  <div className="mt-3">
    <Input
      type="text"
      size="md"
      placeholder="선수 이름이나 등번호로 검색..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

type PlayerListProps = {
  players: TeamPlayer[];
  selection: PlayerSelectionState[];
  onToggleState: (playerId: number, state: LineupState) => void;
  onToggleCaptain: (playerId: number) => void;
};

const PlayerList = ({ players, selection, onToggleState, onToggleCaptain }: PlayerListProps) => {
  if (players.length === 0) {
    return <EmptyMessage>일치하는 선수가 없어요</EmptyMessage>;
  }

  return (
    <div className="mt-4 space-y-2">
      {players.map((player) => (
        <PlayerRow
          key={player.teamPlayerId}
          player={player}
          state={selection.find((p) => p.teamPlayerId === player.teamPlayerId)}
          onToggleState={(target) => onToggleState(player.teamPlayerId, target)}
          onToggleCaptain={() => onToggleCaptain(player.teamPlayerId)}
        />
      ))}
    </div>
  );
};

type PlayerRowProps = {
  player: TeamPlayer;
  state: PlayerSelectionState | undefined;
  onToggleState: (target: LineupState) => void;
  onToggleCaptain: () => void;
};

const PlayerRow = ({ player, state, onToggleState, onToggleCaptain }: PlayerRowProps) => (
  <div className="flex items-center justify-between rounded-lg border p-3">
    <div className="flex items-center gap-3">
      <span className="font-medium">#{player.jerseyNumber}</span>
      <span>{player.name}</span>
    </div>
    <div className="flex gap-2">
      <StateButton
        label="선발"
        active={state?.state === 'STARTER'}
        onClick={() => onToggleState('STARTER')}
      />
      <StateButton
        label="후보"
        active={state?.state === 'CANDIDATE'}
        onClick={() => onToggleState('CANDIDATE')}
      />
      {state?.state === 'STARTER' && (
        <StateButton label="주장" active={Boolean(state.isCaptain)} onClick={onToggleCaptain} />
      )}
    </div>
  </div>
);

type StateButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const StateButton = ({ label, active, onClick }: StateButtonProps) => (
  <Button
    type="button"
    size="md"
    className="px-3"
    color={active ? 'primary' : 'black'}
    variant={active ? 'solid' : 'ghost'}
    onClick={onClick}
  >
    {label}
  </Button>
);

type CandidatesSectionProps = {
  teamName: string;
  view: TeamLineupView;
  players: TeamPlayer[];
  canPromote: boolean;
  onPromoteAll: () => void;
};

const CandidatesSection = ({
  teamName,
  view,
  players,
  canPromote,
  onPromoteAll,
}: CandidatesSectionProps) => (
  <section className="mt-6">
    <header className="flex items-baseline justify-between">
      <Typography weight="semibold">
        {teamName} - 후보 ({view.candidates.length}명)
      </Typography>
      {view.candidates.length > 0 && (
        <button
          type="button"
          className={twMerge(
            'text-sm underline',
            canPromote ? 'text-blue-600' : 'text-neutral-400',
          )}
          onClick={onPromoteAll}
          disabled={!canPromote}
        >
          모두 선발로 올리기
        </button>
      )}
    </header>

    {view.candidates.length === 0 ? (
      <EmptyMessage className="mt-3">등록된 후보가 없어요</EmptyMessage>
    ) : (
      <ul className="mt-3 space-y-1 text-sm text-neutral-700">
        {view.candidates.map((c) => {
          const player = players.find((p) => p.teamPlayerId === c.teamPlayerId);
          return (
            <li key={c.teamPlayerId} className="flex items-center gap-2">
              <span className="font-medium">#{player?.jerseyNumber ?? '-'}</span>
              <span>{player?.name ?? `선수 ${c.teamPlayerId}`}</span>
            </li>
          );
        })}
      </ul>
    )}
  </section>
);

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

type EmptyMessageProps = {
  children: React.ReactNode;
  className?: string;
};

const EmptyMessage = ({ children, className }: EmptyMessageProps) => (
  <p
    className={twMerge(
      'mt-4 rounded-lg border border-dashed border-neutral-200 p-6 text-center text-sm text-neutral-500',
      className,
    )}
  >
    {children}
  </p>
);

const filterPlayers = (players: TeamPlayer[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return players;

  return players.filter(
    (p) => p.name.toLowerCase().includes(q) || p.jerseyNumber?.toString().includes(q),
  );
};
