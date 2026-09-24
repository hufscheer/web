'use client';

import { CaptainIcon } from '~/components/icons';
import { cn } from '~/utils/cn';

export type LineupEntry = {
  teamPlayerId: number;
  playerId: number;
  playerName: string;
  jerseyNumber: number;
  state: 'STARTER' | 'CANDIDATE';
  isCaptain: boolean;
};

type Props = {
  teamName: string;
  teamColor: string;
  lineup: LineupEntry[];
  starterLimit: number;
  onChange: (updated: LineupEntry[]) => void;
};

export const LineupPanel = ({ teamName, teamColor, lineup, starterLimit, onChange }: Props) => {
  const starters = lineup.filter((p) => p.state === 'STARTER');
  const candidates = lineup.filter((p) => p.state === 'CANDIDATE');

  const toggleState = (teamPlayerId: number) =>
    onChange(
      lineup.map((p) =>
        p.teamPlayerId === teamPlayerId
          ? { ...p, state: p.state === 'STARTER' ? 'CANDIDATE' : 'STARTER' }
          : p,
      ),
    );

  const fillStarters = () =>
    onChange(
      lineup.map((p, index) => ({
        ...p,
        state: index < starterLimit ? ('STARTER' as const) : ('CANDIDATE' as const),
      })),
    );

  const clearStarters = () => onChange(lineup.map((p) => ({ ...p, state: 'CANDIDATE' as const })));

  /** 주장은 팀당 한 명이라 새로 지정하면 나머지는 풀린다 */
  const toggleCaptain = (teamPlayerId: number, isCaptain: boolean) => {
    const next = !isCaptain;
    onChange(
      lineup.map((p) => ({
        ...p,
        isCaptain: p.teamPlayerId === teamPlayerId ? next : next ? false : p.isCaptain,
      })),
    );
  };

  const Row = (entry: LineupEntry) => (
    <div
      key={entry.teamPlayerId}
      className="flex items-center gap-2 rounded-[var(--radius-control)] px-2 py-1.5 hover:bg-[var(--color-neutral-50)]"
    >
      <span className="tnum text-t7 w-7 shrink-0 text-right text-[var(--color-neutral-400)]">
        {entry.jerseyNumber}
      </span>
      <span className="text-t6 min-w-0 flex-1 truncate font-medium">{entry.playerName}</span>
      <button
        type="button"
        onClick={() => toggleState(entry.teamPlayerId)}
        className={cn(
          'text-t7 h-6 shrink-0 rounded-md px-2 font-semibold transition-colors',
          entry.state === 'STARTER'
            ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]'
            : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]',
        )}
      >
        {entry.state === 'STARTER' ? '선발' : '후보'}
      </button>
      <button
        type="button"
        title={entry.isCaptain ? '주장 해제' : '주장 지정'}
        aria-pressed={entry.isCaptain}
        onClick={() => toggleCaptain(entry.teamPlayerId, entry.isCaptain)}
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-md transition-colors',
          entry.isCaptain
            ? 'bg-[var(--color-neutral-900)] text-white'
            : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-200)]',
        )}
      >
        <CaptainIcon size={12} />
      </button>
    </div>
  );

  const over = starters.length > starterLimit;

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]">
      <div
        className="flex items-center justify-between gap-2 border-b border-[var(--color-greyscale-50)] px-4 py-3"
        style={{ borderLeft: `4px solid ${teamColor}` }}
      >
        <span className="text-t6 min-w-0 truncate font-bold">{teamName}</span>
        <span className="flex shrink-0 items-center gap-2">
          {lineup.length > 0 && (
            <button
              type="button"
              onClick={starters.length > 0 ? clearStarters : fillStarters}
              className="text-t7 rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] px-2 py-0.5 font-medium text-[var(--color-neutral-600)] transition-colors hover:bg-[var(--color-greyscale-25)]"
            >
              {starters.length > 0 ? '선발 비우기' : `앞에서 ${starterLimit}명 선발`}
            </button>
          )}
          <span
            className={cn(
              'tnum text-t7 font-semibold',
              over ? 'text-[var(--color-danger-600)]' : 'text-[var(--color-neutral-400)]',
            )}
          >
            선발 {starters.length} / {starterLimit}
          </span>
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {lineup.length === 0 ? (
          <p className="text-t6 py-10 text-center text-[var(--color-neutral-400)]">
            팀을 먼저 선택해 주세요.
          </p>
        ) : (
          <>
            {starters.length > 0 && (
              <>
                <p className="text-t7 px-2 py-1 font-bold text-[var(--color-neutral-400)]">선발</p>
                {starters.map(Row)}
              </>
            )}
            {candidates.length > 0 && (
              <>
                <p className="text-t7 mt-2 px-2 py-1 font-bold text-[var(--color-neutral-400)]">
                  후보
                </p>
                {candidates.map(Row)}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
