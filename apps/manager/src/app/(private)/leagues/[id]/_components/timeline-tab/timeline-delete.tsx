'use client';

import { Typography, toast } from '@hcc/ui';
import Image from 'next/image';
import { useMemo } from 'react';

import { type TimelineRecordTypeBySport, useSuspenseGameTimeline } from '~/api';
import { useDeleteTimeline } from '~/api/mutations/useDeleteTimeline';
import { AlertDialog } from '~/components/ui';

type Props = { gameId: number };

export const TimelineDeleteMenu = ({ gameId }: Props) => {
  const {
    data: { timelines: timelineData },
  } = useSuspenseGameTimeline({ gameId });

  const typeLabel = (t?: string) => {
    switch (t) {
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
      default:
        return t ?? '-';
    }
  };

  const { latestRecord, latestRecordId } = useMemo(() => {
    const all = (timelineData ?? []).flatMap((q) =>
      (q.records ?? []).map((r) => ({ ...r, __quarter: q.gameQuarter.label })),
    );

    const toNum = (v: unknown) => Number(v);
    let best: (TimelineRecordTypeBySport<'SOCCER' | 'BASKETBALL'> & { __quarter: string }) | null =
      null;
    for (const r of all) {
      const id = toNum(r.recordId);
      if (!Number.isFinite(id)) continue;

      if (!best) {
        best = r;
        continue;
      }

      const bestId = toNum(best.recordId);
      // id가 더 크면 교체, id가 같으면 recordedAt(시간) 큰 쪽을 최신으로
      if (
        id > bestId ||
        (id === bestId &&
          (r.recordedAt ?? Number.NEGATIVE_INFINITY) >
            (best.recordedAt ?? Number.NEGATIVE_INFINITY))
      ) {
        best = r;
      }
    }

    return {
      latestRecord: best,
      latestRecordId: best ? toNum(best.recordId) : null,
    };
  }, [timelineData]);

  const { mutate: deleteTimeline } = useDeleteTimeline({ gameId });

  const handleDelete = () => {
    if (!latestRecordId) {
      toast.error('삭제할 기록이 없어요');
      return;
    }
    deleteTimeline(
      { gameId, timelineId: latestRecordId },
      { onSuccess: () => toast.success('최근 기록이 삭제되었어요') },
    );
  };
  const extraNode = (
    <div className="rounded-md bg-neutral-50 px-5 py-3">
      {latestRecord?.teamImageUrl ? (
        <div className="mt-2 flex flex-row justify-between">
          <div className="center-y flex-1 gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={latestRecord.teamImageUrl}
                alt={`${latestRecord.teamName ?? ''} 팀 로고`}
                priority={false}
                fill
              />
            </div>
            <Typography fontSize={14} weight="medium">
              {latestRecord.teamName}
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-between text-sm">
            <span className="font-semibold">{latestRecord.playerName ?? '-'}</span>
            <span className="font-regular text-neutral-500">{typeLabel(latestRecord.type)}</span>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex justify-center text-center">
          <div className="flex flex-col items-center text-sm">
            <span className="font-regular text-neutral-500">{typeLabel(latestRecord?.type)}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <AlertDialog
      title="이 타임라인을 삭제할게요"
      description="삭제한 기록은 다시 복구할 수 없어요"
      primaryTitle="삭제"
      secondaryTitle="취소"
      onPrimaryClick={handleDelete}
      extra={extraNode}
    >
      <Typography
        className="cursor-pointer disabled:opacity-50"
        color="var(--color-danger-600)"
        weight="semibold"
      >
        최근 기록 삭제
      </Typography>
    </AlertDialog>
  );
};
