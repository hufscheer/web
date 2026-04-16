'use client';

import { Button, Input } from '@hcc/ui';
import { Suspense } from '@suspensive/react';

import type { SportType } from '~/api/types';

import { InputDate } from '~/components/ui/input-date';
import { InputSelect } from '~/components/ui/input-select';
import { getRoundOptions } from '~/constants/leagues';

const SPORT_OPTIONS: { value: SportType; label: string; emoji: string }[] = [
  { value: 'SOCCER', label: '축구', emoji: '⚽' },
  { value: 'BASKETBALL', label: '농구', emoji: '🏀' },
];

export type LeagueInfoForm = {
  name: string;
  startAt?: Date;
  endAt?: Date;
  maxRound?: number | undefined;
  sportType: SportType;
};

type LeagueInfoProps = {
  form: LeagueInfoForm;
  onChange: (patch: Partial<LeagueInfoForm>) => void;
  onNext: () => void;
  isFormValid: boolean;
  //isEdit?: boolean;
};

const LeagueInfo = ({ form, onChange, onNext, isFormValid }: LeagueInfoProps) => {
  return (
    <div className="column h-full gap-1.5 bg-white p-5">
      <Suspense clientOnly>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold text-black">대회 구분</div>
          <div className="grid grid-cols-2 gap-2">
            {SPORT_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                size="md"
                color={form.sportType === opt.value ? 'primary' : 'black'}
                variant={form.sportType === opt.value ? 'solid' : 'subtle'}
                onClick={() => onChange({ sportType: opt.value })}
              >
                {opt.emoji} {opt.label}
              </Button>
            ))}
          </div>
          <div className="text-lg font-semibold text-black">대회 정보</div>
          <Input
            name="name"
            size="xl"
            type="text"
            placeholder="대회 이름"
            autoComplete="name"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />

          <InputDate
            label="시작 일"
            value={form.startAt}
            onSelect={(d) => onChange({ startAt: d ?? undefined })}
          />

          <InputDate
            label="종료 일"
            value={form.endAt}
            onSelect={(d) => onChange({ endAt: d ?? undefined })}
          />

          <InputSelect
            options={getRoundOptions(form.sportType).map((o) => ({
              value: o.value,
              label: o.label,
            }))}
            label="라운드"
            value={form.maxRound ? String(form.maxRound) : undefined}
            onValueChange={(v) => onChange({ maxRound: Number(v) })}
          />
        </div>
        <div className="mt-auto flex flex-col gap-2">
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
        </div>
      </Suspense>
    </div>
  );
};

export default LeagueInfo;
