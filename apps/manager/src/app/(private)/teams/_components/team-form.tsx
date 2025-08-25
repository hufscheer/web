'use client';

import { toast } from '@hcc/ui';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { TeamFormType, TeamType } from '~/api';
import { StepProgress } from './step-progress';
import { TeamBasicInfoStep } from './team-basic-info-step';
import { TeamPlayersStep } from './team-players-step';

type Props = {
  onSubmit: (data: TeamFormType) => Promise<void> | void;
  initialData?: Partial<TeamFormType> & { teams?: TeamType[] };
} & Omit<ComponentProps<'form'>, 'onSubmit'>;

const STEPS = [
  { id: 'basic', title: '팀 정보' },
  { id: 'players', title: '플레이어' },
];

export const TeamForm = ({ className, onSubmit, initialData, ...props }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<TeamFormType>({
    defaultValues: initialData || {
      name: '',
      logoImageUrl: '',
      unit: '',
      teamColor: '',
      teamPlayers: [],
    },
    mode: 'onChange',
  });

  // 현재 스탭의 유효성 검사
  const watchedValues = form.watch();
  const isBasicInfoValid = Boolean(
    watchedValues.name?.trim() && watchedValues.unit?.trim() && watchedValues.teamColor,
  );

  const handleNext = () => {
    if (currentStep === 0 && isBasicInfoValid) {
      setCurrentStep(1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const formData = form.getValues();

      if (!formData.name || !formData.unit || !formData.teamColor) {
        toast.error('필수 정보를 모두 입력해주세요.');
        return;
      }

      if (!formData.teamPlayers || formData.teamPlayers.length === 0) {
        toast.error('최소 1명의 플레이어를 추가해주세요.');
        return;
      }

      if (!formData.teamPlayers.every(player => player.playerId > 0 && player.jerseyNumber > 0)) {
        toast.error('모든 플레이어의 정보를 올바르게 입력해주세요.');
        return;
      }

      const playerIds = formData.teamPlayers.map(p => p.playerId);
      const jerseyNumbers = formData.teamPlayers.map(p => p.jerseyNumber);

      if (new Set(playerIds).size !== playerIds.length) {
        toast.error('중복된 플레이어가 선택되었습니다.');
        return;
      }

      if (new Set(jerseyNumbers).size !== jerseyNumbers.length) {
        toast.error('중복된 등번호가 있습니다.');
        return;
      }

      await onSubmit(formData);
    } catch (error) {
      console.error('폼 제출 실패:', error);
      toast.error('폼 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleFormError = (errors: Record<string, { message?: string }>) => {
    const messages = Object.values(errors)
      .map(error => error?.message)
      .filter(Boolean);

    const [first, ...rest] = messages;
    const suffix = rest.length > 0 ? ` (외 ${rest.length}개의 오류)` : '';

    toast.error(`${first}${suffix}`);
  };

  return (
    <FormProvider {...form}>
      <form
        className={twMerge('column w-full bg-white', className)}
        onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
        {...props}
      >
        <StepProgress
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS.map(step => step.title)}
        />

        <div className="min-h-[400px]">
          {currentStep === 0 && (
            <TeamBasicInfoStep onNext={handleNext} isValid={isBasicInfoValid} />
          )}

          {currentStep === 1 && (
            <TeamPlayersStep
              onPrevious={handlePrevious}
              onSubmit={handleFormSubmit}
              initialData={initialData}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};
