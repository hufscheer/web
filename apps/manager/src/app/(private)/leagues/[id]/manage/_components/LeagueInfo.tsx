'use client';

import { Button, Input, toast } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSuspenseLeague, useUpdateLeagues } from '~/api';
import { InputDate } from '~/components/ui/input-date';
import { InputSelect } from '~/components/ui/input-select';

// 1. 라운드 옵션은 기존과 동일하게 유지
const ROUND_SIZES = [32, 16, 8, 4, 2];
const ROUND_OPTIONS = ROUND_SIZES.map(n => ({
  value: String(n),
  label: n === 2 ? '결승' : `${n}강`,
}));

type Props = {
  leagueId: number;
};

export const LeagueEditForm = ({ leagueId }: Props) => {
  const router = useRouter();

  const { data: leagueData } = useSuspenseLeague({ leagueId });
  const { mutate, isPending } = useUpdateLeagues();

  const [form, setForm] = useState({
    leagueName: leagueData.name,
    startDate: new Date(leagueData.startAt),
    endDate: new Date(leagueData.endAt),
    roundSize: leagueData.maxRound,
  });

  const onChange = (patch: Partial<typeof form>) => {
    setForm(prev => ({ ...prev, ...patch }));
  };

  const isFormValid = !!form.leagueName && !!form.startDate && !!form.endDate && !!form.roundSize;

  const handleUpdate = () => {
    mutate(
      {
        leagueId,
        name: form.leagueName,
        startAt: form.startDate.toISOString(),
        endAt: form.endDate.toISOString(),
        maxRound: form.roundSize,
      },
      {
        onSuccess: () => {
          toast.success('대회 정보가 수정되었습니다.');
          router.back();
        },
        onError: () => {
          toast.error('대회 수정에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className="column h-full gap-1.5 bg-white p-5">
      <Suspense clientOnly>
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-black text-lg">대회 정보 수정</div>
          <Input
            name="name"
            size="xl"
            type="text"
            placeholder="대회 이름"
            value={form.leagueName}
            onChange={e => onChange({ leagueName: e.target.value })}
          />

          <InputDate
            label="시작 일"
            value={form.startDate}
            onSelect={d => onChange({ startDate: d ?? undefined })}
          />

          <InputDate
            label="종료 일"
            value={form.endDate}
            onSelect={d => onChange({ endDate: d ?? undefined })}
          />

          <InputSelect
            options={ROUND_OPTIONS}
            label="라운드"
            value={form.roundSize ? String(form.roundSize) : undefined}
            onValueChange={v => onChange({ roundSize: Number(v) })}
          />
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <Button size="lg" className="w-full" variant="subtle" onClick={() => router.back()}>
            취소
          </Button>
          <Button
            size="lg"
            className="w-full"
            color="primary"
            onClick={handleUpdate}
            disabled={!isFormValid || isPending}
            loading={isPending}
          >
            수정 완료
          </Button>
        </div>
      </Suspense>
    </div>
  );
};
