'use client';

import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import { twMerge } from 'tailwind-merge';

import type { LeagueTeamsPlayerType } from '~/api';

/**
 * 라인업 화면의 표시 조각. 경기 **생성**과 **수정**이 같이 쓴다.
 *
 * <p>원래는 생성 쪽(`create-game/_components/lineups`)에만 있었다. 그 UI 를 새로 짜면서
 * 수정 화면은 예전 컴포넌트에 그대로 뒀더니, 같은 라인업을 두 가지 모양으로 보여주게 됐다.
 * 여기로 빼서 한 벌만 남긴다.
 *
 * <p>여기 있는 것들은 **상태를 모른다.** 선택 상태와 저장 방식은 두 화면이 다르다 —
 * 생성은 폼에 모았다가 마지막에 한 번 저장하고, 수정은 조작할 때마다 서버에 바로 쓴다.
 * 그래서 이 조각들은 값과 콜백만 받는다.
 */

export type TeamNum = 1 | 2;
export type LineupState = 'STARTER' | 'CANDIDATE';

/** 행 하나를 그리는 데 필요한 최소한. 생성·수정의 선택 상태 타입이 둘 다 이걸 만족한다 */
export type LineupEntry = {
  teamPlayerId: number;
  isCaptain: boolean;
};

export type TeamLineupView = {
  starters: LineupEntry[];
  candidates: LineupEntry[];
};

export type RosterPlayer = LeagueTeamsPlayerType;

type TeamTabsProps = {
  activeTab: TeamNum;
  teamNames: Record<TeamNum, string>;
  onSelect: (tab: TeamNum) => void;
};

export const TeamTabs = ({ activeTab, teamNames, onSelect }: TeamTabsProps) => (
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
          {teamNames[tab]}
        </button>
      ))}
    </div>
  </div>
);

type StartersSectionProps = {
  teamName: string;
  view: TeamLineupView;
  players: RosterPlayer[];
  starterLimit: number;
  onToggleCaptain: (teamPlayerId: number) => void;
  onDemote: (teamPlayerId: number) => void;
};

export const StartersSection = ({
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
        {view.starters.map((s) => (
          <PlayerRow
            key={s.teamPlayerId}
            player={players.find((p) => p.teamPlayerId === s.teamPlayerId)}
            teamPlayerId={s.teamPlayerId}
            captainSlot={
              <CaptainBadge active={s.isCaptain} onClick={() => onToggleCaptain(s.teamPlayerId)} />
            }
            action={
              <ActionButton
                label="후보로 이동"
                variant="down"
                onClick={() => onDemote(s.teamPlayerId)}
              />
            }
          />
        ))}
      </ul>
    )}
  </section>
);

type CandidatesSectionProps = {
  teamName: string;
  view: TeamLineupView;
  players: RosterPlayer[];
  canPromote: boolean;
  onPromoteAll: () => void;
  onPromote: (teamPlayerId: number) => void;
};

export const CandidatesSection = ({
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
        {view.candidates.map((c) => (
          <PlayerRow
            key={c.teamPlayerId}
            player={players.find((p) => p.teamPlayerId === c.teamPlayerId)}
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
        ))}
      </ul>
    )}
  </section>
);

type PlayerRowProps = {
  player: RosterPlayer | undefined;
  teamPlayerId: number;
  captainSlot: React.ReactNode;
  action: React.ReactNode;
};

export const PlayerRow = ({ player, teamPlayerId, captainSlot, action }: PlayerRowProps) => (
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

export const CaptainBadge = ({ active, onClick }: CaptainBadgeProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    aria-label={active ? '주장 해제' : '주장 지정'}
    className={twMerge(
      'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-xs font-bold transition-colors',
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

export const ActionButton = ({ label, variant, disabled, onClick }: ActionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={twMerge(
      'flex h-8 w-8 cursor-pointer items-center justify-center text-green-500 transition-colors',
      disabled ? 'cursor-not-allowed text-neutral-300' : 'hover:text-green-600',
    )}
  >
    {variant === 'down' ? <ArrowCircleDownIcon /> : <ArrowCircleUpIcon />}
  </button>
);

type EmptyMessageProps = {
  children: React.ReactNode;
  className?: string;
};

export const EmptyMessage = ({ children, className }: EmptyMessageProps) => (
  <p
    className={twMerge(
      'mt-4 rounded-lg border border-dashed border-neutral-200 p-6 text-center text-sm text-neutral-500',
      className,
    )}
  >
    {children}
  </p>
);
