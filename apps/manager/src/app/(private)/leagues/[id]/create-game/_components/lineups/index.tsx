'use client';

import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@hcc/icons';
import { Button, Typography } from '@hcc/ui';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { TeamNum } from '../../constants';
import type { TeamLineupView } from './use-lineup-derived';
import type { TeamBucket, TeamPlayer } from './use-lineups';

import { PlayerSearchPopover } from './player-search-popover';
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
      <TeamTabs activeTab={activeTab} teamBuckets={teamBuckets} onSelect={setActiveTab} />

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

type StartersSectionProps = {
  teamName: string;
  view: TeamLineupView;
  players: TeamPlayer[];
  starterLimit: number;
  onToggleCaptain: (playerId: number) => void;
  onDemote: (playerId: number) => void;
};

const StartersSection = ({
  teamName,
  view,
  players,
  starterLimit,
  onToggleCaptain,
  onDemote,
}: StartersSectionProps) => (
  <section className="mt-6">
    <header className="flex items-baseline justify-between">
      <Typography weight="semibold">{teamName} - 선발</Typography>
      <span className="text-xs text-neutral-500">
        {view.starters.length}/{starterLimit}명
      </span>
    </header>

    {view.starters.length === 0 ? (
      <EmptyMessage className="mt-3">선발 선수를 추가해주세요</EmptyMessage>
    ) : (
      <ul className="mt-3 space-y-2">
        {view.starters.map((s) => {
          const player = players.find((p) => p.teamPlayerId === s.teamPlayerId);
          return (
            <PlayerRow
              key={s.teamPlayerId}
              player={player}
              teamPlayerId={s.teamPlayerId}
              captainSlot={
                <CaptainBadge
                  active={s.isCaptain}
                  onClick={() => onToggleCaptain(s.teamPlayerId)}
                />
              }
              action={
                <ActionButton
                  label="후보로 이동"
                  variant="down"
                  onClick={() => onDemote(s.teamPlayerId)}
                />
              }
            />
          );
        })}
      </ul>
    )}
  </section>
);

type CandidatesSectionProps = {
  teamName: string;
  view: TeamLineupView;
  players: TeamPlayer[];
  canPromote: boolean;
  onPromoteAll: () => void;
  onPromote: (playerId: number) => void;
};

const CandidatesSection = ({
  teamName,
  view,
  players,
  canPromote,
  onPromoteAll,
  onPromote,
}: CandidatesSectionProps) => (
  <section className="mt-6">
    <header className="flex items-baseline justify-between">
      <Typography weight="semibold">{teamName} - 후보</Typography>
      {view.candidates.length > 0 && (
        <button
          type="button"
          className={twMerge(
            'text-sm',
            canPromote ? 'text-neutral-500 hover:text-neutral-700' : 'text-neutral-300',
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
      <ul className="mt-3 space-y-2">
        {view.candidates.map((c) => {
          const player = players.find((p) => p.teamPlayerId === c.teamPlayerId);
          return (
            <PlayerRow
              key={c.teamPlayerId}
              player={player}
              teamPlayerId={c.teamPlayerId}
              captainSlot={<span aria-hidden className="h-8 w-8" />}
              action={
                <ActionButton
                  label="선발로 이동"
                  variant="up"
                  disabled={!canPromote}
                  onClick={() => onPromote(c.teamPlayerId)}
                />
              }
            />
          );
        })}
      </ul>
    )}
  </section>
);

type PlayerRowProps = {
  player: TeamPlayer | undefined;
  teamPlayerId: number;
  captainSlot: React.ReactNode;
  action: React.ReactNode;
};

const PlayerRow = ({ player, teamPlayerId, captainSlot, action }: PlayerRowProps) => (
  <li className="grid grid-cols-[auto_1fr_32px_32px] items-center gap-3 rounded-xl border border-neutral-100 bg-white p-3">
    <span className="px-2 text-sm font-medium text-neutral-900">{player?.jerseyNumber ?? '-'}</span>
    <div className="flex min-w-0 flex-col">
      <span className="truncate text-sm font-medium text-neutral-900">
        {player?.name ?? `선수 ${teamPlayerId}`}
      </span>
      <span className="truncate text-xs text-neutral-500">{player?.studentNumber ?? '-'}</span>
    </div>
    {captainSlot}
    {action}
  </li>
);

type CaptainBadgeProps = {
  active: boolean;
  onClick: () => void;
};

const CaptainBadge = ({ active, onClick }: CaptainBadgeProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    aria-label={active ? '주장 해제' : '주장 지정'}
    className={twMerge(
      'flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold transition-colors cursor-pointer',
      active ? 'bg-orange-500 text-white' : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200',
    )}
  >
    C
  </button>
);

type ActionButtonProps = {
  label: string;
  variant: 'up' | 'down';
  disabled?: boolean;
  onClick: () => void;
};

const ActionButton = ({ label, variant, disabled, onClick }: ActionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={twMerge(
      'flex h-8 w-8 items-center justify-center text-green-500 transition-colors cursor-pointer',
      disabled ? 'cursor-not-allowed text-neutral-300' : 'hover:text-green-600',
    )}
  >
    {variant === 'down' ? <ArrowCircleDownIcon /> : <ArrowCircleUpIcon />}
  </button>
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
