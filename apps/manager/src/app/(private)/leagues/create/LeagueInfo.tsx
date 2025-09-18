'use client';
import { Button, Input } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { InputSelect } from '~/components/ui/input-select';
import { InputDate } from '~/components/ui/input-date';

export type LeagueForm = {
  leagueName: string;
  startDate?: Date;
  endDate?: Date;
  round?: string;
};

const ROUND_STRINGS = ['32강', '16강', '8강', '4강', '결승'];
const ROUND_OPTIONS = ROUND_STRINGS.map(round => ({
  value: round,
  label: round,
}));

type LeagueInfoProps = {
  form: LeagueForm;
  onChange: (patch: Partial<LeagueForm>) => void;
  onNext: () => void;
  isFormValid: boolean;
};

const LeagueInfo = ({ form, onChange, onNext, isFormValid }: LeagueInfoProps) => {
  return (
    <div className="column h-full gap-1.5 bg-white p-5">
      <Suspense clientOnly>
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-black text-lg">대회 정보</div>

          <Input
            name="name"
            size="xl"
            type="text"
            placeholder="대회 이름"
            autoComplete="name"
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
            value={form.round}
            onValueChange={v => onChange({ round: v })}
          />
        </div>

        <Button
          size="lg"
          className="w-full"
          color="primary"
          onClick={onNext}
          disabled={!isFormValid}
        >
          다음 단계
        </Button>

        <Button size="lg" className="w-full" color="primary" disabled>
          대회 생성
        </Button>
      </Suspense>
    </div>
  );
};

export default LeagueInfo;
