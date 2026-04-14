'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useState } from 'react';

import type { ProgressStateType } from '~/api/types';

import { useCreateTimelinesProgress } from '~/api/mutations/useCreateTimelineStatus';
import { PROGRESS_TYPE, QUARTER_TYPE } from '~/api/types';
import { InputSelect } from '~/components/ui/input-select';

type SelectOption = { label: string; value: string };

const BASKETBALL_QUARTER_LABELS = {
  PRE_GAME: '경기 시작',
  FIRST_HALF: '1쿼터',
  SECOND_HALF: '2쿼터',
  EXTRA_TIME: '3쿼터',
  PENALTY_SHOOTOUT: '4쿼터',
} as const;

const quarterOptions: SelectOption[] = (
  Object.keys(BASKETBALL_QUARTER_LABELS) as Array<keyof typeof BASKETBALL_QUARTER_LABELS>
).map((key) => ({
  label: BASKETBALL_QUARTER_LABELS[key],
  value: QUARTER_TYPE[key],
}));

const PROGRESS_LABELS = {
  QUARTER_START: '쿼터 시작',
  GAME_END: '경기 종료',
} as const;

const progressOptions: SelectOption[] = (
  Object.keys(PROGRESS_LABELS) as Array<keyof typeof PROGRESS_LABELS>
).map((key) => ({
  label: PROGRESS_LABELS[key],
  value: PROGRESS_TYPE[key],
}));

export default function BasketballStatusChangeSheet({
  gameId,
  onClose,
}: {
  leagueId: number;
  gameId: number;
  onClose: () => void;
}) {
  const { mutate: createProgress, isPending } = useCreateTimelinesProgress({ gameId });

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [progress, setProgress] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState('');

  const isFormValid = quarter && progress && minute;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요.');
      return;
    }
    const request: ProgressStateType = {
      gameId,
      recordedQuarter: quarter.value,
      gameProgressType: progress.value as keyof typeof PROGRESS_TYPE,
      recordedAt: Number(minute),
      sportType: 'BASKETBALL',
    };
    createProgress(request, {
      onSuccess: () => {
        toast.success('상태 변경이 등록되었습니다.');
        onClose();
      },
      onError: () => {
        toast.error('상태 변경 등록에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={quarterOptions}
        value={quarter?.value}
        onValueChange={(value) =>
          setQuarter(quarterOptions.find((opt) => opt.value === value) ?? null)
        }
      />
      <InputSelect
        label="상황"
        options={progressOptions}
        value={progress?.value}
        onValueChange={(value) =>
          setProgress(progressOptions.find((opt) => opt.value === value) ?? null)
        }
      />
      <Input
        placeholder="시간(분)"
        type="number"
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        min={0}
      />
      <Button
        color="black"
        size="lg"
        onClick={submit}
        loading={isPending}
        disabled={!isFormValid || isPending}
      >
        타임라인 등록
      </Button>
    </div>
  );
}
