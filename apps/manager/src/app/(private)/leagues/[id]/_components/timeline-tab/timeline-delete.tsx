'use client';

import { DeleteForeverIcon } from '@hcc/icons';
import { Button, Typography, toast } from '@hcc/ui';
import Image from 'next/image';

import type { TimelineRecord } from '~/api';

import { useDeleteTimeline } from '~/api/mutations/useDeleteTimeline';
import { AlertDialog } from '~/components/ui';

import { useTimelineDeleteMode } from './timeline-delete-context';

export const TimelineDeleteMenu = () => {
  const { isDeleteMode, toggleDeleteMode } = useTimelineDeleteMode();

  return (
    <Typography
      color={isDeleteMode ? 'var(--color-primary-600)' : 'var(--color-danger-600)'}
      weight="semibold"
      asChild
    >
      <button type="button" className="cursor-pointer" onClick={toggleDeleteMode}>
        {isDeleteMode ? '완료' : '타임라인 삭제'}
      </button>
    </Typography>
  );
};

const getTypeLabel = (type: TimelineRecord['type']) => {
  switch (type) {
    case 'SCORE':
      return '득점';
    case 'SOCCER_REPLACEMENT':
    case 'BASKETBALL_REPLACEMENT':
      return '교체';
    case 'PK':
      return 'PK';
    case 'WARNING_CARD':
      return '경고/퇴장';
    case 'GAME_PROGRESS':
      return '쿼터';
    case 'FOUL':
      return '파울';
  }
};

export const TimelineRecordDeleteButton = ({
  gameId,
  record,
  className,
}: {
  gameId: number;
  record: TimelineRecord;
  className?: string;
}) => {
  const { isDeleteMode } = useTimelineDeleteMode();
  const { mutate: deleteTimeline } = useDeleteTimeline({ gameId });

  if (!isDeleteMode) return null;

  const handleDelete = () => {
    deleteTimeline(
      { gameId, timelineId: record.recordId },
      {
        onSuccess: () => toast.success('타임라인을 삭제했어요'),
        onError: () => toast.error(record.undeletableReason ?? '타임라인을 삭제할 수 없어요'),
      },
    );
  };

  return (
    <AlertDialog
      title="이 타임라인을 삭제할게요"
      description="삭제한 기록은 다시 복구할 수 없어요"
      primaryTitle="삭제"
      secondaryTitle="취소"
      onPrimaryClick={handleDelete}
      extra={
        <div className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-2.5">
          <div className="center-y min-w-0 gap-2">
            {record.teamImageUrl && (
              <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
                <Image src={record.teamImageUrl} alt="팀 로고" fill sizes="24px" />
              </div>
            )}
            <Typography className="truncate" fontSize={14} weight="medium">
              {record.teamName}
            </Typography>
          </div>
          <div className="shrink-0 text-right text-sm">
            <div className="font-semibold">{record.playerName || '-'}</div>
            <div className="text-neutral-500">{getTypeLabel(record.type)}</div>
          </div>
        </div>
      }
    >
      <Button
        type="button"
        aria-label={`${getTypeLabel(record.type)} 기록 삭제`}
        variant="ghost"
        color={record.deletable === false ? 'black' : 'danger'}
        className={`h-[38px] w-14 shrink-0 gap-2.5 bg-transparent px-5 py-2.5 ${
          record.deletable === false
            ? '!text-[var(--color-neutral-500)]'
            : '!text-[var(--color-danger-600)]'
        } ${className ?? ''}`}
        onClick={(event) => {
          if (record.deletable === false) {
            event.preventDefault();
            event.stopPropagation();
            toast.error(record.undeletableReason ?? '삭제할 수 없는 기록이에요');
          }
        }}
      >
        <DeleteForeverIcon size={18} />
      </Button>
    </AlertDialog>
  );
};
