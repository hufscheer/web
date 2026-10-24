'use client';

import { Fragment } from 'react';

import type { Game, TimelineRecord } from '~/app/(desktop)/_types';

import {
  BasketballIcon,
  DeleteOutlineIcon,
  FoulIcon,
  SportsAndOutdoorsIcon,
  TradeIcon,
} from '~/app/(desktop)/_components/icons';
import { cn } from '~/utils/cn';

type Props = {
  game: Game;
  records: TimelineRecord[];
  onDelete: (record: TimelineRecord) => void;
};

const RecordIcon = ({ record, basketball }: { record: TimelineRecord; basketball: boolean }) => {
  switch (record.type) {
    case 'SCORE':
      return basketball ? (
        <BasketballIcon size={18} className="shrink-0 text-[var(--color-neutral-900)]" />
      ) : (
        <SportsAndOutdoorsIcon size={18} className="shrink-0 text-[var(--color-neutral-900)]" />
      );
    case 'OWN_GOAL':
      return (
        <SportsAndOutdoorsIcon size={18} className="shrink-0 text-[var(--color-danger-600)]" />
      );
    case 'PK':
      return (
        <SportsAndOutdoorsIcon
          size={18}
          className={cn(
            'shrink-0',
            record.pkSuccess ? 'text-[var(--color-rec-score)]' : 'text-[var(--color-neutral-400)]',
          )}
        />
      );
    case 'SOCCER_REPLACEMENT':
    case 'BASKETBALL_REPLACEMENT':
      return <TradeIcon size={18} className="shrink-0 text-[var(--color-rec-swap)]" />;
    case 'WARNING_CARD':
      return (
        <span
          aria-hidden
          className={cn(
            'h-5 w-3.5 shrink-0 rounded-sm',
            record.cardType === 'RED'
              ? 'bg-[var(--color-danger-600)]'
              : 'bg-[var(--color-rec-yellow-card)]',
          )}
        />
      );
    case 'FOUL':
      return <FoulIcon size={18} className="shrink-0 text-[var(--color-rec-foul)]" />;
    default:
      return null;
  }
};

const DeleteButton = ({
  record,
  onDelete,
  side,
  small,
}: {
  record: TimelineRecord;
  onDelete: (record: TimelineRecord) => void;
  side: 'left' | 'right' | 'center';
  small?: boolean;
}) => (
  <span className="relative inline-flex shrink-0">
    <button
      type="button"
      onClick={() => onDelete(record)}
      aria-label={record.deletable ? '기록 삭제' : '삭제할 수 없는 기록'}
      className={cn(
        'peer grid place-items-center rounded-[var(--radius-control)] border transition',
        small ? 'size-6' : 'size-8',
        record.deletable
          ? 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-500)] hover:border-[var(--color-danger-200)] hover:bg-[var(--color-danger-50)] hover:text-[var(--color-danger-600)]'
          : 'cursor-not-allowed border-transparent bg-[var(--color-greyscale-25)] text-[var(--color-neutral-300)]',
      )}
    >
      <DeleteOutlineIcon size={small ? 14 : 17} />
    </button>

    {!record.deletable && record.undeletableReason && (
      <span
        role="tooltip"
        className={cn(
          'text-t7 pointer-events-none absolute bottom-[calc(100%+6px)] z-10 w-58 rounded-[var(--radius-control)] bg-[var(--color-greyscale-500)] px-2.5 py-2 leading-snug text-white opacity-0 transition-opacity peer-hover:opacity-100 peer-focus-visible:opacity-100',
          side === 'left' && 'left-0',
          side === 'right' && 'right-0',
          side === 'center' && 'left-1/2 -translate-x-1/2',
        )}
      >
        {record.undeletableReason}
      </span>
    )}
  </span>
);

export const TimelineList = ({ game, records, onDelete }: Props) => {
  const [home, away] = game.gameTeams;
  const basketball = game.sportType === 'BASKETBALL';

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]">
      <header className="flex items-baseline justify-between px-5 pt-4 pb-3">
        <h2 className="text-t5 font-bold tracking-tight">경기 기록</h2>
        <span className="tnum text-t7 text-[var(--color-neutral-400)]">{records.length}건</span>
      </header>

      <div className="flex-1 overflow-y-auto pb-3">
        {records.length === 0 && (
          <p className="text-t6 px-5 py-12 text-center text-[var(--color-neutral-400)]">
            아직 기록이 없어요.
          </p>
        )}

        {records.map((record, index) => {
          const prevQuarter = index > 0 ? records[index - 1].recordedQuarter : null;
          // 어느 팀도 아니면 왼쪽에 둔다
          const isAway = record.gameTeamId === away.gameTeamId;
          const teamColor = isAway ? away.teamColor : home.teamColor;

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

              {record.type === 'GAME_PROGRESS' ? (
                <div className="flex items-center gap-3 px-5 py-2">
                  <span className="h-px flex-1 bg-[var(--color-greyscale-50)]" />
                  <span className="text-t7 text-[var(--color-neutral-400)]">{record.title}</span>
                  <DeleteButton record={record} onDelete={onDelete} side="center" small />
                  <span className="h-px flex-1 bg-[var(--color-greyscale-50)]" />
                </div>
              ) : (
                // 반으로 딱 나누면 1024px 창(카드 약 290px)에서 이름이 한 글자로 잘린다. 한 줄에 기록이 하나라 넘쳐도 겹치지 않는다
                <div className={cn('flex px-5 py-2', isAway ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      // 내용 폭만 차지해야 삭제 버튼이 기록 옆에 붙는다
                      'flex max-w-[85%] min-w-0 items-center gap-2.5 rounded-[var(--radius-control)] px-1 py-1 hover:bg-[var(--color-greyscale-25)]',
                      isAway && 'flex-row-reverse text-right',
                    )}
                  >
                    <span
                      aria-hidden
                      className="h-10 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: teamColor }}
                    />
                    <span className="tnum text-t7 grid size-11 shrink-0 place-items-center rounded-full border border-[var(--color-greyscale-50)] font-medium text-[var(--color-neutral-700)]">
                      {record.type === 'PK' ? 'P.S' : `${record.recordedAt}'`}
                    </span>
                    <RecordIcon record={record} basketball={basketball} />
                    <div className="mx-1 flex min-w-0 flex-col gap-0.5">
                      <span className="text-t6 truncate font-bold">{record.title}</span>
                      {record.subtitle && (
                        <span className="text-t7 truncate text-[var(--color-neutral-400)]">
                          {record.subtitle}
                        </span>
                      )}
                    </div>
                    <DeleteButton
                      record={record}
                      onDelete={onDelete}
                      side={isAway ? 'right' : 'left'}
                    />
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};
