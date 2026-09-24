'use client';

import { useQueryClient } from '@hcc/api-base';
import { queryKeys, useUpdateGamesPosition } from '@hcc/manager-api';
import { useState } from 'react';

import type { Game, Lineup, LineupPlayer, SportType } from '~/types';

import { CaptainIcon } from '~/components/icons';
import { POSITION_GROUPS } from '~/constants/sports';
import { cn } from '~/utils/cn';
import { parseHTTPError } from '~/utils/http-error';

type Props = {
  game: Game;
  lineups: [Lineup, Lineup];
  onToast: (message: string) => void;
  onError: (message: string) => void;
  className?: string;
};

/**
 * 서버는 한 팀의 표시 수준을 하나로 맞춘다. 한 명을 대분류로 두면 그 팀 전원이 대분류로,
 * 미입력으로 되돌리면 전원이 미입력이 된다. 그래서 저장 뒤 라인업을 통째로 다시 받는다.
 */
const PositionSelect = ({
  gameId,
  player,
  sportType,
  onToast,
  onError,
}: {
  gameId: number;
  player: LineupPlayer;
  sportType: SportType;
  onToast: (message: string) => void;
  onError: (message: string) => void;
}) => {
  const qc = useQueryClient();
  const { mutateAsync: updatePosition, isPending: saving } = useUpdateGamesPosition();

  const change = async (value: string) => {
    try {
      await updatePosition({
        gameId,
        lineupPlayerId: player.lineupPlayerId,
        position: value || null,
      });
      onToast(value ? `${player.playerName} ${value}` : `${player.playerName} 포지션을 비웠어요`);
    } catch (error) {
      onError(await parseHTTPError(error, '포지션을 저장하지 못했어요'));
      void qc.invalidateQueries({ queryKey: queryKeys.games.lineup({ gameId }).queryKey });
    }
  };

  return (
    <select
      aria-label={`${player.playerName} 포지션`}
      value={player.position ?? ''}
      disabled={saving}
      onChange={(e) => void change(e.target.value)}
      className={cn(
        'text-t7 h-7 rounded-[var(--radius-control)] border px-1.5 font-bold tracking-wide transition-colors',
        player.position
          ? 'border-transparent bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]'
          : 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-300)]',
        saving && 'opacity-50',
      )}
    >
      <option value="">미입력</option>
      {POSITION_GROUPS[sportType].map(({ group, broad, items }) => (
        <optgroup key={group} label={group}>
          {broad && <option value={broad}>{broad} · 대분류</option>}
          {items.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

/** 4파울 주의, 5파울 퇴장 */
const foulTone = (count: number) => {
  if (count >= 5) return 'bg-[var(--color-rec-foul-soft)] text-[var(--color-rec-foul)]';
  if (count >= 4) return 'bg-[var(--color-rec-warning-soft)] text-[var(--color-rec-warning)]';
  return 'text-[var(--color-neutral-400)]';
};

const PlayerRow = ({
  player,
  isBasketball,
  showPosition,
  positionControl,
}: {
  player: LineupPlayer;
  isBasketball: boolean;
  /** 후보는 관객 화면에 포지션이 안 나간다 */
  showPosition: boolean;
  positionControl?: React.ReactNode;
}) => (
  <div className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-[var(--color-hairline)] px-5 py-2.5 last:border-b-0 hover:bg-[var(--color-neutral-50)]">
    <span className="tnum text-t7 text-center font-semibold text-[var(--color-neutral-400)]">
      {player.jerseyNumber}
    </span>

    <span className="flex min-w-0 items-center gap-1.5">
      <span className="text-t7 truncate font-medium">{player.playerName}</span>
      {player.isCaptain && (
        <CaptainIcon size={14} className="shrink-0 text-[var(--color-greyscale-900)]" />
      )}
      {!player.isPlaying && player.isReplaced && (
        <span className="text-t7 shrink-0 text-[var(--color-danger-600)]">교체 아웃</span>
      )}
    </span>

    <span className="flex shrink-0 items-center gap-1.5">
      {isBasketball && (
        <span
          className={cn(
            'tnum text-t7 rounded px-1.5 py-0.5 font-semibold',
            foulTone(player.foulCount ?? 0),
          )}
        >
          {player.foulCount ?? 0}반칙
        </span>
      )}
      {positionControl ??
        (player.position ? (
          <span className="text-t7 rounded-md bg-[var(--color-neutral-100)] px-1.5 py-0.5 font-bold tracking-wide text-[var(--color-neutral-500)]">
            {player.position}
          </span>
        ) : showPosition ? (
          <span className="text-t7 text-[var(--color-neutral-300)]">미입력</span>
        ) : null)}
    </span>
  </div>
);

export const LineupPanel = ({ game, lineups, onToast, onError, className }: Props) => {
  const [tab, setTab] = useState<0 | 1>(0);
  const lineup = lineups[tab];
  const isBasketball = game.sportType === 'BASKETBALL';

  const starters = lineup.starterPlayers;
  const filled = starters.filter((p) => p.position !== null).length;
  const gateOpen = lineup.positionsPublic ?? (starters.length > 0 && filled === starters.length);

  return (
    <section
      className={cn(
        'flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]',
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b border-[var(--color-greyscale-50)] px-5 py-3">
        <h2 className="text-t6 font-semibold">라인업</h2>
        <div className="flex gap-1">
          {lineups.map((l, i) => (
            <button
              key={l.gameTeamId}
              type="button"
              onClick={() => setTab(i as 0 | 1)}
              aria-pressed={tab === i}
              className={cn(
                'text-t7 h-8 rounded-[var(--radius-control)] px-3 font-semibold transition-colors',
                tab === i
                  ? 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]'
                  : 'text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-50)]',
              )}
            >
              {l.teamName}
            </button>
          ))}
        </div>
      </header>

      <div
        className={cn(
          'text-t7 border-b px-5 py-2.5 leading-snug',
          gateOpen
            ? 'border-[var(--color-greyscale-50)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]'
            : 'border-[var(--color-greyscale-50)] bg-[var(--color-greyscale-25)] text-[var(--color-neutral-500)]',
        )}
      >
        포지션 <b className="tnum">{filled}</b>/{starters.length}
        {gateOpen ? ' · 관객에게 표시돼요' : ' · 전원 입력해야 표시돼요'}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="text-t7 border-y border-[var(--color-greyscale-50)] bg-[var(--color-greyscale-25)] px-5 py-2 font-bold tracking-wider text-[var(--color-neutral-500)]">
          선발
        </div>
        {starters.map((p) => (
          <PlayerRow
            key={p.lineupPlayerId}
            player={p}
            isBasketball={isBasketball}
            showPosition
            positionControl={
              <PositionSelect
                gameId={game.gameId}
                player={p}
                sportType={game.sportType}
                onToast={onToast}
                onError={onError}
              />
            }
          />
        ))}

        <div className="text-t7 border-y border-[var(--color-greyscale-50)] bg-[var(--color-greyscale-25)] px-5 py-2 font-bold tracking-wider text-[var(--color-neutral-500)]">
          후보
        </div>
        {lineup.candidatePlayers.map((p) => (
          <PlayerRow
            key={p.lineupPlayerId}
            player={p}
            isBasketball={isBasketball}
            showPosition={false}
          />
        ))}
      </div>
    </section>
  );
};
