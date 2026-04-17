'use client';

import { CheckSmallIcon } from '@hcc/icons';
import { Button, toast } from '@hcc/ui';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ProgressAvailableAction, ProgressStateType } from '~/api/types';

import { useCreateTimelinesProgress } from '~/api/mutations/useCreateTimelineStatus';
import { useSuspenseGameTimelineProgressAvailable } from '~/api/queries/useGameTimelineProgressAvailable';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { AlertDialog } from '~/components/ui';

export default function StatusChangeSheet({
  leagueId,
  gameId,
  onClose,
}: {
  leagueId: number;
  gameId: number;
  onClose: () => void;
}) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data } = useSuspenseGameTimelineProgressAvailable({ gameId });
  const { mutate: createProgress, isPending } = useCreateTimelinesProgress({ gameId });

  const [selected, setSelected] = useState<ProgressAvailableAction | null>(null);

  const submit = () => {
    if (!selected) return;

    const request: ProgressStateType = {
      gameId,
      recordedQuarter: selected.quarter,
      gameProgressType: selected.gameProgressType,
      recordedAt: null,
      sportType: league.sportType,
    };

    createProgress(request, {
      onSuccess: () => {
        toast.success('상태가 변경되었어요');
        onClose();
      },
      onError: () => {
        toast.error('상태 변경에 실패했어요 다시 시도해주세요');
      },
    });
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상태</div>

      <div className="flex flex-col gap-2">
        {data.availableActions.map((action) => {
          const isSelected =
            selected?.quarter === action.quarter &&
            selected?.gameProgressType === action.gameProgressType;

          return (
            <button
              key={`${action.quarter}-${action.gameProgressType}`}
              type="button"
              className={twMerge(
                'flex items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-medium transition-colors',
                isSelected ? 'border-blue-500 text-black' : 'border-neutral-200 text-neutral-400',
              )}
              onClick={() => setSelected(action)}
            >
              <span>{action.displayName}</span>
              <span
                className={twMerge(
                  'flex h-5 w-5 items-center justify-center rounded border',
                  isSelected ? 'border-blue-500 bg-blue-500' : 'border-neutral-300',
                )}
              >
                {isSelected && <CheckSmallIcon className="text-white" />}
              </span>
            </button>
          );
        })}
      </div>

      <AlertDialog
        title={`${selected?.displayName} 처리 할게요`}
        description="변경된 상태는 수정이 불가할 수 있어요"
        primaryTitle="등록"
        onPrimaryClick={submit}
      >
        <Button color="black" size="lg" disabled={!selected || isPending} loading={isPending}>
          타임라인 등록
        </Button>
      </AlertDialog>
    </div>
  );
}
