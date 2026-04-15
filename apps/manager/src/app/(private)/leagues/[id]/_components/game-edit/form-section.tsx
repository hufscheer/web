'use client';

import { Button, Input, Spinner, Typography, toast } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { type GameUpdateFormType, useSuspenseGame, useSuspenseLeague, useUpdateGames } from '~/api';
import { InputSelect } from '~/components/ui/input-select';
import { getRoundOptions, quarterOptions, stateOptions } from '~/constants/leagues';
import { handleFormError } from '~/utils/form-util';

import { StepProgress } from '../game-form/step-progress';
import { GameLineupEditSection } from './game-lineup-edit-section';

type Props = {
  leagueId: number;
  gameId: number;
};

const STEPS = [
  { id: 'basic', title: '경기 정보' },
  { id: 'lineup', title: '라인업' },
  { id: 'video', title: '경기 영상' },
] as const;

type BasicStepProps = {
  leagueId: number;
  onNext: () => void;
};

const GameEditBasicStep = ({ leagueId, onNext }: BasicStepProps) => {
  const { register, watch, control } = useFormContext<GameUpdateFormType>();
  const { data: league } = useSuspenseLeague({ leagueId });

  const [name, round, quarter, state, startTime] = watch([
    'name',
    'round',
    'quarter',
    'state',
    'startTime',
  ]);

  const isValid = Boolean(name?.trim() && round && quarter && state && startTime);

  const roundOptions_ = getRoundOptions(league.sportType)
    .filter((item) => league.maxRound >= item.round)
    .map((item) => ({ value: item.value.toString(), label: item.label }));

  const quarterListOptions = Object.entries(quarterOptions).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const stateListOptions = Object.entries(stateOptions).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <Typography weight="semibold">경기 정보</Typography>

        <div className="column mt-4 gap-3">
          <Input
            {...register('name', { required: '명칭은 필수 입력값이에요.' })}
            size="lg"
            type="text"
            placeholder="명칭"
          />

          <Controller
            name="round"
            control={control}
            render={({ field }) => (
              <InputSelect
                label="라운드"
                options={roundOptions_}
                value={field.value?.toString()}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            name="quarter"
            control={control}
            render={({ field }) => (
              <InputSelect
                label="쿼터"
                options={quarterListOptions}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <InputSelect
                label="상황"
                options={stateListOptions}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <Input
            {...register('startTime', { required: '시작 일시는 필수 입력값이에요.' })}
            size="lg"
            type="datetime-local"
            placeholder="시작 일시"
            required
          />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-gray-200 bg-white pt-4">
        <Button
          type="button"
          className="w-full"
          size="lg"
          color="black"
          onClick={onNext}
          disabled={!isValid}
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
};

type VideoStepProps = {
  onPrevious: () => void;
  onSubmit: () => void;
};

const GameEditVideoStep = ({ onPrevious, onSubmit }: VideoStepProps) => {
  const { register } = useFormContext<GameUpdateFormType>();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <Typography weight="semibold">영상</Typography>

        <div className="column mt-4 gap-3">
          <Input size="lg" type="text" placeholder="영상 URL" {...register('videoId')} />
        </div>
      </div>

      <div className={twMerge('flex-shrink-0 border-t border-gray-200 bg-white pt-4')}>
        <div className="flex gap-3">
          <Button
            type="button"
            className="flex-1"
            size="lg"
            color="primary"
            variant="ghost"
            onClick={onPrevious}
          >
            이전 단계
          </Button>
          <Button type="button" className="flex-1" size="lg" color="black" onClick={onSubmit}>
            경기 수정
          </Button>
        </div>
      </div>
    </div>
  );
};

const FormSectionInner = ({ leagueId, gameId }: Props) => {
  const router = useRouter();
  const { data } = useSuspenseGame({ gameId });

  const [step, setStep] = useState<0 | 1 | 2>(0);

  const form = useForm<GameUpdateFormType>({
    defaultValues: {
      name: data.gameName,
      round: data.round,
      quarter: data.gameQuarter.key,
      state: data.state,
      startTime: data.startTime,
      videoId: data.videoId,
    },
  });

  const { mutate } = useUpdateGames();

  const handleFormSubmit = (formData: GameUpdateFormType) => {
    if (step !== 2) {
      toast.warning('모든 단계를 완료해야 경기 수정이 가능해요');
      return;
    }
    if (!form.formState.isValid) {
      toast.error('입력값을 확인해주세요. 모든 단계의 입력값이 유효해야 해요.');
      return;
    }

    mutate(
      { ...formData, leagueId, gameId },
      {
        onSuccess: () => {
          toast.success('경기가 수정되었어요');
          router.back();
        },
        onError: (error) => {
          console.error(`[manager/leagues/${leagueId}]`, error);
          toast.error('경기 수정에 실패했어요. 잠시 후 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex h-full w-full flex-col bg-white p-4"
        onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
      >
        <StepProgress
          currentStep={step}
          totalSteps={STEPS.length}
          steps={STEPS.map((s) => s.title)}
        />

        <div className="mt-6 flex-1 overflow-hidden">
          {step === 0 && (
            <Suspense fallback={<Spinner className="self-center" />} clientOnly>
              <GameEditBasicStep leagueId={leagueId} onNext={() => setStep(1)} />
            </Suspense>
          )}

          {step === 1 && (
            <GameLineupEditSection
              gameId={gameId}
              leagueId={leagueId}
              onNext={() => setStep(2)}
              onPrevious={() => setStep(0)}
            />
          )}

          {step === 2 && (
            <GameEditVideoStep
              onPrevious={() => setStep(1)}
              onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export const FormSection = ({ leagueId, gameId }: Props) => {
  return (
    <Suspense clientOnly>
      <FormSectionInner leagueId={leagueId} gameId={gameId} />
    </Suspense>
  );
};
