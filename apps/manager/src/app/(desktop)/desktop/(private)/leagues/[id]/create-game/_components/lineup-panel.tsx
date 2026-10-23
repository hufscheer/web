'use client';

import { AddIcon, CaptainIcon, CloseIcon } from '~/app/(desktop)/_components/icons';
import { cn } from '~/utils/cn';

export type LineupEntry = {
  /** 팀 명단에서 빠진 선수가 이미 라인업에 있을 수 있어, 수정 화면에서는 모를 수 있다 */
  teamPlayerId: number | null;
  /** 이미 서버에 등록된 라인업 선수. 수정 화면에서만 있다 */
  lineupPlayerId?: number;
  /** 수정 화면에서 라인업 밖(미등록)으로 뺀 선수 */
  excluded?: boolean;
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
  /** 팀을 골랐는가 */
  picked: boolean;
  loading: boolean;
  /** 명단 요청이 실패했는가 */
  failed: boolean;
  starterLimit: number;
  onChange: (updated: LineupEntry[]) => void;
  /** 선발이 가득 찬 채 또 선발로 올리려 할 때 */
  onLimit?: () => void;
  /** 수정 화면: 라인업에서 빼고 다시 넣는 미등록 그룹을 보여 준다 */
  allowExclude?: boolean;
};

export const LineupPanel = ({
  teamName,
  teamColor,
  lineup,
  picked,
  loading,
  failed,
  starterLimit,
  onChange,
  onLimit,
  allowExclude = false,
}: Props) => {
  const registered = lineup.filter((p) => !p.excluded);
  const reserve = lineup.filter((p) => p.excluded);
  const starters = registered.filter((p) => p.state === 'STARTER');
  const candidates = registered.filter((p) => p.state === 'CANDIDATE');

  // 서버는 후보로 내리면 주장을 풀어 버린다. 수정 화면에서는 같은 규칙을 화면에도 건다
  const demote = (p: LineupEntry): LineupEntry => ({
    ...p,
    state: 'CANDIDATE',
    isCaptain: allowExclude ? false : p.isCaptain,
  });

  const toggleState = (playerId: number) => {
    const target = lineup.find((p) => p.playerId === playerId);
    if (!target) return;
    if (target.state === 'CANDIDATE' && starters.length >= starterLimit) {
      onLimit?.();
      return;
    }
    onChange(
      lineup.map((p) =>
        p.playerId === playerId
          ? p.state === 'STARTER'
            ? demote(p)
            : { ...p, state: 'STARTER' }
          : p,
      ),
    );
  };

  const exclude = (playerId: number) =>
    onChange(lineup.map((p) => (p.playerId === playerId ? { ...demote(p), excluded: true } : p)));

  const include = (playerId: number) =>
    onChange(
      lineup.map((p) =>
        p.playerId === playerId
          ? { ...p, excluded: false, state: 'CANDIDATE', isCaptain: false }
          : p,
      ),
    );

  /** 라인업이 비어 있는 경기면 생성 화면처럼 명단 전원을 넣고 채운다 */
  const fillStarters = () => {
    const pool = registered.length > 0 ? registered : lineup;
    onChange(
      lineup.map((p) => {
        const index = pool.indexOf(p);
        if (index === -1) return p;
        const entry = { ...p, excluded: false };
        return index < starterLimit ? { ...entry, state: 'STARTER' as const } : demote(entry);
      }),
    );
  };

  const clearStarters = () => onChange(lineup.map((p) => (p.excluded ? p : demote(p))));

  /** 주장은 팀당 한 명이라 새로 지정하면 나머지는 풀린다 */
  const toggleCaptain = (playerId: number, isCaptain: boolean) => {
    const next = !isCaptain;
    onChange(
      lineup.map((p) => ({
        ...p,
        isCaptain: p.playerId === playerId ? next : next ? false : p.isCaptain,
      })),
    );
  };

  const ReserveRow = (entry: LineupEntry) => (
    <div
      key={entry.playerId}
      className="flex items-center gap-2 rounded-[var(--radius-control)] px-2 py-1.5 hover:bg-[var(--color-neutral-50)]"
    >
      <span className="tnum text-t7 w-7 shrink-0 text-right text-[var(--color-neutral-400)]">
        {entry.jerseyNumber}
      </span>
      <span className="text-t6 min-w-0 flex-1 truncate font-medium text-[var(--color-neutral-500)]">
        {entry.playerName}
      </span>
      {/* 명단에서 빠진 선수는 한 번 빼면 다시 넣을 수 없다 */}
      {entry.teamPlayerId !== null && (
        <button
          type="button"
          title="후보로 등록"
          onClick={() => include(entry.playerId)}
          className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] transition-colors hover:bg-[var(--color-neutral-200)]"
        >
          <AddIcon size={14} />
        </button>
      )}
    </div>
  );

  const Row = (entry: LineupEntry) => (
    <div
      key={entry.playerId}
      className="flex items-center gap-2 rounded-[var(--radius-control)] px-2 py-1.5 hover:bg-[var(--color-neutral-50)]"
    >
      <span className="tnum text-t7 w-7 shrink-0 text-right text-[var(--color-neutral-400)]">
        {entry.jerseyNumber}
      </span>
      <span className="text-t6 min-w-0 flex-1 truncate font-medium">{entry.playerName}</span>
      <button
        type="button"
        onClick={() => toggleState(entry.playerId)}
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
        disabled={allowExclude && entry.state !== 'STARTER'}
        onClick={() => toggleCaptain(entry.playerId, entry.isCaptain)}
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-md transition-colors disabled:opacity-40',
          entry.isCaptain
            ? 'bg-[var(--color-neutral-900)] text-white'
            : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-200)]',
        )}
      >
        <CaptainIcon size={12} />
      </button>
      {allowExclude && (
        <button
          type="button"
          title="라인업에서 빼기"
          onClick={() => exclude(entry.playerId)}
          className="flex size-6 shrink-0 items-center justify-center rounded-md text-[var(--color-neutral-400)] transition-colors hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-700)]"
        >
          <CloseIcon size={14} />
        </button>
      )}
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
            {!picked
              ? '팀을 먼저 선택해 주세요.'
              : loading
                ? '명단 불러오는 중…'
                : failed
                  ? '명단을 불러오지 못했어요. 팀을 다시 선택해 주세요.'
                  : '이 팀에 등록된 선수가 없어요.'}
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
            {allowExclude && reserve.length > 0 && (
              <>
                <p className="text-t7 mt-2 px-2 py-1 font-bold text-[var(--color-neutral-400)]">
                  미등록
                </p>
                {reserve.map(ReserveRow)}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
