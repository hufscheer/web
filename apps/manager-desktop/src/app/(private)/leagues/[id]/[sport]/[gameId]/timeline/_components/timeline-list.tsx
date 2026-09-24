'use client';

import { Fragment } from 'react';

import type { Game, TimelineRecord, TimelineType } from '~/types';

import { DeleteOutlineIcon, ErrorIcon, FoulIcon, TradeIcon } from '~/components/icons';
import { cn } from '~/utils/cn';

type Props = {
  game: Game;
  records: TimelineRecord[];
  onDelete: (record: TimelineRecord) => void;
};

type Style = {
  Icon: typeof TradeIcon | null;
  fg: string;
  bg: string;
  strong: boolean;
};

const STYLE: Record<TimelineType, Style> = {
  SCORE: {
    Icon: null,
    fg: 'text-[var(--color-rec-score)]',
    bg: 'bg-[var(--color-rec-score-soft)]',
    strong: true,
  },
  PK: {
    Icon: null,
    fg: 'text-[var(--color-rec-score)]',
    bg: 'bg-[var(--color-rec-score-soft)]',
    strong: true,
  },
  OWN_GOAL: {
    Icon: null,
    fg: 'text-[var(--color-rec-owngoal)]',
    bg: 'bg-[var(--color-rec-owngoal-soft)]',
    strong: true,
  },
  SOCCER_REPLACEMENT: {
    Icon: TradeIcon,
    fg: 'text-[var(--color-rec-swap)]',
    bg: 'bg-[var(--color-rec-swap-soft)]',
    strong: false,
  },
  BASKETBALL_REPLACEMENT: {
    Icon: TradeIcon,
    fg: 'text-[var(--color-rec-swap)]',
    bg: 'bg-[var(--color-rec-swap-soft)]',
    strong: false,
  },
  WARNING_CARD: {
    Icon: ErrorIcon,
    fg: 'text-[var(--color-rec-warning)]',
    bg: 'bg-[var(--color-rec-warning-soft)]',
    strong: false,
  },
  FOUL: {
    Icon: FoulIcon,
    fg: 'text-[var(--color-rec-foul)]',
    bg: 'bg-[var(--color-rec-foul-soft)]',
    strong: false,
  },
  GAME_PROGRESS: {
    Icon: null,
    fg: 'text-[var(--color-neutral-400)]',
    bg: '',
    strong: false,
  },
};

const isScoring = (type: TimelineType) => type === 'SCORE' || type === 'OWN_GOAL' || type === 'PK';

export const TimelineList = ({ game, records, onDelete }: Props) => {
  const [home, away] = game.gameTeams;

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]">
      <header className="flex items-baseline justify-between px-5 pt-4 pb-3">
        <h2 className="text-t5 font-bold tracking-tight">경기 기록</h2>
        <span className="tnum text-t7 text-[var(--color-neutral-400)]">{records.length}건</span>
      </header>

      <div className="flex-1 overflow-y-auto pb-3">
        {records.length === 0 && (
          <p className="text-t6 px-5 py-12 text-center text-[var(--color-neutral-400)]">
            아직 기록이 없어요. 왼쪽에서 기록을 추가해 주세요.
          </p>
        )}

        {records.map((record, index) => {
          const style = STYLE[record.type];
          const isProgress = record.type === 'GAME_PROGRESS';
          const scoring = isScoring(record.type);
          const teamColor = record.gameTeamId === home.gameTeamId ? home.teamColor : away.teamColor;
          const prevQuarter = index > 0 ? records[index - 1].recordedQuarter : null;

          return (
            <Fragment key={record.recordId}>
              {record.recordedQuarter !== prevQuarter && (
                <div className="flex items-center gap-3 px-5 pt-6 pb-2.5">
                  <span className="text-t7 font-bold text-[var(--color-neutral-500)]">
                    {record.recordedQuarter}
                  </span>
                  <span className="h-px flex-1 bg-[var(--color-greyscale-50)]" />
                </div>
              )}

              <div
                className={cn(
                  'group grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3.5 px-5 py-2.5',
                  'border-b border-[var(--color-hairline)] last:border-b-0',
                  'hover:bg-[var(--color-greyscale-25)]',
                )}
              >
                <span
                  className={cn(
                    'tnum text-t7 text-right',
                    scoring
                      ? 'font-bold text-[var(--color-neutral-700)]'
                      : 'text-[var(--color-neutral-400)]',
                  )}
                >
                  {record.type === 'PK' ? 'P.S' : `${record.recordedAt}'`}
                </span>

                <div className="flex min-w-0 items-center gap-2.5">
                  {!isProgress && (
                    <span
                      aria-hidden
                      className="h-4.5 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: teamColor }}
                    />
                  )}

                  {style.Icon && (
                    <span className={cn('grid size-5 shrink-0 place-items-center', style.fg)}>
                      <style.Icon size={15} />
                    </span>
                  )}

                  <span className="min-w-0 truncate">
                    <span
                      className={cn(
                        'truncate',
                        style.strong && 'text-t6 font-bold',
                        !style.strong && !isProgress && 'text-t6 text-[var(--color-neutral-700)]',
                        isProgress && 'text-t7 text-[var(--color-neutral-400)]',
                      )}
                    >
                      {record.title}
                    </span>
                    {record.subtitle && !isProgress && (
                      <span className="text-t7 ml-2 text-[var(--color-neutral-400)]">
                        {record.subtitle}
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {record.snapshot && (
                    <span
                      className={cn(
                        'tnum text-t7 rounded-md px-2 py-0.5 font-bold',
                        style.bg,
                        style.fg,
                      )}
                    >
                      {record.snapshot[0]} : {record.snapshot[1]}
                    </span>
                  )}

                  <span className="relative inline-flex">
                    <button
                      type="button"
                      onClick={() => onDelete(record)}
                      aria-label={record.deletable ? '기록 삭제' : '삭제할 수 없는 기록'}
                      className={cn(
                        'peer grid size-8 place-items-center rounded-[var(--radius-control)] border transition',
                        record.deletable
                          ? 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-500)] hover:border-[var(--color-danger-200)] hover:bg-[var(--color-danger-50)] hover:text-[var(--color-danger-600)]'
                          : 'cursor-not-allowed border-transparent bg-[var(--color-greyscale-25)] text-[var(--color-neutral-300)]',
                      )}
                    >
                      <DeleteOutlineIcon size={17} />
                    </button>

                    {!record.deletable && record.undeletableReason && (
                      <span
                        role="tooltip"
                        className="text-t7 pointer-events-none absolute right-0 bottom-[calc(100%+6px)] z-10 w-58 rounded-[var(--radius-control)] bg-[var(--color-greyscale-500)] px-2.5 py-2 leading-snug text-white opacity-0 transition-opacity peer-hover:opacity-100 peer-focus-visible:opacity-100"
                      >
                        {record.undeletableReason}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};
