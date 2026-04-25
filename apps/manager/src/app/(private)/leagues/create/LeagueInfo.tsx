'use client';

import type { ReactNode } from 'react';

import { Button, Input } from '@hcc/ui';
import { Suspense } from '@suspensive/react';

import type { SportType } from '~/api';

import { InputDate } from '~/components/ui/input-date';
import { InputSelect } from '~/components/ui/input-select';
import { SportIcon } from '~/constants/sports';

export type LeagueInfoForm = {
  name: string;
  startAt?: Date;
  endAt?: Date;
  maxRound?: number | undefined;
  sportType: SportType;
};

const ROUND_SIZES = [100, 16, 8, 4, 2];
const ROUND_OPTIONS = ROUND_SIZES.map((n) => ({
  value: String(n),
  label: n === 2 ? '결승' : n === 100 ? '예선' : `${n}강`,
}));

const SPORT_OPTIONS: { value: SportType; label: string }[] = [
  { value: 'SOCCER', label: '축구' },
  { value: 'BASKETBALL', label: '농구' },
];

/* -------------------------------------------------------------------------------------------------
 * LeagueInfo (Root)
 * -----------------------------------------------------------------------------------------------*/

const LeagueInfoRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div className="column h-full gap-1.5 bg-white p-5">
      <Suspense clientOnly>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold text-black">대회 정보</div>
          {children}
        </div>
      </Suspense>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueInfo.SportSelect
 * -----------------------------------------------------------------------------------------------*/

type SportSelectProps = {
  value: SportType;
  onChange: (sportType: SportType) => void;
  disabled?: boolean;
};

const LeagueInfoSportSelect = ({ value, onChange, disabled }: SportSelectProps) => {
  return (
    <div className="flex gap-2">
      {SPORT_OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="lg"
          variant={value === option.value ? 'solid' : 'subtle'}
          color={value === option.value ? 'primary' : 'black'}
          className="flex-1"
          onClick={() => onChange(option.value)}
          disabled={disabled && value !== option.value}
        >
          <SportIcon sportType={option.value} size={20} />
          {option.label}
        </Button>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueInfo.Fields
 * -----------------------------------------------------------------------------------------------*/

type FieldsProps = {
  form: LeagueInfoForm;
  onChange: (patch: Partial<LeagueInfoForm>) => void;
};

const LeagueInfoFields = ({ form, onChange }: FieldsProps) => {
  return (
    <>
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
        options={ROUND_OPTIONS}
        label="라운드"
        value={form.maxRound ? String(form.maxRound) : undefined}
        onValueChange={(v) => onChange({ maxRound: Number(v) })}
      />
    </>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueInfo.Actions
 * -----------------------------------------------------------------------------------------------*/

type ActionsProps = {
  onNext: () => void;
  isFormValid: boolean;
};

const LeagueInfoActions = ({ onNext, isFormValid }: ActionsProps) => {
  return (
    <div className="mt-auto flex flex-col gap-2">
      <Button
        size="lg"
        className="w-full"
        color="primary"
        onClick={onNext}
        disabled={!isFormValid}
        variant="subtle"
      >
        다음 단계
      </Button>
      <Button size="lg" className="w-full" color="primary" disabled>
        완료
      </Button>
    </div>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const LeagueInfo = Object.assign(LeagueInfoRoot, {
  SportSelect: LeagueInfoSportSelect,
  Fields: LeagueInfoFields,
  Actions: LeagueInfoActions,
});

export default LeagueInfo;
