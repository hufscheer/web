'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useState } from 'react';

import type { ProgressStateType } from '~/api/types';

import { useCreateTimelinesProgress } from '~/api/mutations/useCreateTimelineStatus';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { PROGRESS_TYPE, QUARTER_TYPE } from '~/api/types';
import { InputSelect } from '~/components/ui/input-select';

type SelectOption = { label: string; value: string };

type LabelType<T, K extends keyof T> = Pick<Record<keyof T, string>, K>;
type ErrorResponseBody = {
  message?: string;
  error?: string;
};

const getErrorMessage = async (error: unknown) => {
  if (!error || typeof error !== 'object' || !('response' in error)) return null;

  const { response } = error as { response: unknown };
  if (!(response instanceof Response)) return null;

  try {
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json') || contentType.includes('+json')) {
      const data = (await response.clone().json()) as ErrorResponseBody;
      return data.message ?? data.error ?? null;
    }

    const text = await response.clone().text();
    return text || null;
  } catch {
    return null;
  }
};

const QUARTER_LABELS: LabelType<
  typeof QUARTER_TYPE,
  Exclude<keyof typeof QUARTER_TYPE, 'POST_GAME'>
> = {
  PRE_GAME: '경기 시작',
  FIRST_HALF: '전반',
  SECOND_HALF: '후반',
  EXTRA_TIME: '연장전',
  PENALTY_SHOOTOUT: '승부차기',
};
const quarterOptions: SelectOption[] = (
  Object.keys(QUARTER_LABELS) as Array<keyof typeof QUARTER_LABELS>
).map((key) => ({
  label: QUARTER_LABELS[key],
  value: QUARTER_TYPE[key],
}));

const PROGRESS_LABELS: LabelType<typeof PROGRESS_TYPE, 'QUARTER_START' | 'GAME_END'> = {
  QUARTER_START: '쿼터 시작',
  GAME_END: '경기 종료',
};
const progressOptions: SelectOption[] = (
  Object.keys(PROGRESS_LABELS) as Array<keyof typeof PROGRESS_LABELS>
).map((key) => ({
  label: PROGRESS_LABELS[key],
  value: PROGRESS_TYPE[key],
}));

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
  const sportType = league.sportType;
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
      sportType,
    };

    createProgress(request, {
      onSuccess: () => {
        toast.success('상태 변경이 등록되었습니다.');
        onClose();
      },
      onError: async (error) => {
        const serverMessage = await getErrorMessage(error);
        toast.error(serverMessage ?? '상태 변경 등록에 실패했습니다. 다시 시도해주세요.');
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
          setQuarter(quarterOptions.find((opt) => opt.value === value) || null)
        }
      />
      <InputSelect
        label="상황"
        options={progressOptions}
        value={progress?.value}
        onValueChange={(value) =>
          setProgress(progressOptions.find((opt) => opt.value === value) || null)
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
