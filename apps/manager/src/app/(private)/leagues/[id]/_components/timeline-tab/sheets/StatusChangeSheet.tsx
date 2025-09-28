'use client';

import { useState } from 'react';
import { Button, Input, toast } from '@hcc/ui';
import { InputSelect } from '~/components/ui/input-select';
import { PROGRESS_TYPE, QUARTER_TYPE } from '~/api/types';
import type { ProgressStateType } from '~/api/types';
import { useCreateTimelinesProgress } from '~/api/mutations/useCreateTimelineStatus';

type SelectOption = { label: string; value: string };

const QUARTER_LABELS: Partial<Record<keyof typeof QUARTER_TYPE, string>> = {
  FIRST_HALF: '전반',
  SECOND_HALF: '후반',
  EXTRA_TIME: '연장전',
  PENALTY_SHOOTOUT: '승부차기',
};
const quarterOptions: SelectOption[] = (
  Object.keys(QUARTER_LABELS) as Array<keyof typeof QUARTER_LABELS>
).map(key => ({
  label: QUARTER_LABELS[key]!,
  value: QUARTER_TYPE[key],
}));

const PROGRESS_LABELS: Partial<Record<keyof typeof PROGRESS_TYPE, string>> = {
  QUARTER_START: '쿼터 시작',
  GAME_END: '경기 종료',
};
const progressOptions: SelectOption[] = (
  Object.keys(PROGRESS_LABELS) as Array<keyof typeof PROGRESS_LABELS>
).map(key => ({
  label: PROGRESS_LABELS[key]!,
  value: PROGRESS_TYPE[key],
}));

export default function StatusChangeSheet({
  gameId,
  onClose,
}: {
  gameId: number;
  onClose: () => void;
}) {
  const { mutate: createProgress, isPending } = useCreateTimelinesProgress({
    gameId,
  });
  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [progress, setProgress] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState<string>('');

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
    };

    createProgress(request, {
      onSuccess: () => {
        toast('상태 변경이 등록되었습니다.');
        onClose();
      },
      onError: error => {
        console.error('상태 변경 실패:', error);
        toast.error('상태 변경 등록에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="font-medium text-base text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={quarterOptions}
        value={quarter?.value}
        onValueChange={value => setQuarter(quarterOptions.find(opt => opt.value === value) || null)}
      />
      <InputSelect
        label="상황"
        options={progressOptions}
        value={progress?.value}
        onValueChange={value =>
          setProgress(progressOptions.find(opt => opt.value === value) || null)
        }
      />

      <Input
        placeholder="시간(분)"
        type="number"
        value={minute}
        onChange={e => setMinute(e.target.value)}
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
