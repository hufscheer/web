import { toast } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { TeamFormType } from '~/api';
import { SwitchCase } from '~/components/feature';
import { StepProgress } from './step-progress';
import { TeamBasicInfoStep } from './team-basic-info-step';
import { TeamPlayersStep } from './team-players-step';

type Props = {
  onSubmit: (data: TeamFormType) => Promise<void> | void;
  initialData?: Partial<TeamFormType>;
} & Omit<ComponentProps<'form'>, 'onSubmit'>;

const STEPS = [
  { id: 'basic', title: '팀 정보' },
  { id: 'players', title: '선수 등록' },
] as const;

export const TeamForm = ({ className, onSubmit, initialData, ...props }: Props) => {
  const [step, setStep] = useState<0 | 1>(0);

  const form = useForm<TeamFormType>({
    defaultValues: {
      name: '',
      logoImageUrl: '',
      unit: '',
      teamColor: '',
      teamPlayers: [],
      ...initialData,
    },
  });

  const handleFormSubmit = async (data: TeamFormType) => {
    const result = onSubmit(data);
    if (result instanceof Promise) {
      return result;
    }
    return Promise.resolve();
  };

  const handleFormError = (errors: FieldErrors<TeamFormType>) => {
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
          currentStep={step}
          totalSteps={STEPS.length}
          steps={STEPS.map(step => step.title)}
        />

        <SwitchCase
          value={step}
          caseBy={{
            0: <TeamBasicInfoStep onNext={() => (step === 0 ? setStep(1) : undefined)} />,
            1: (
              <Suspense fallback={<div>로딩중...</div>} clientOnly>
                <TeamPlayersStep onPrevious={() => (step === 1 ? setStep(0) : undefined)} />
              </Suspense>
            ),
          }}
        />
      </form>
    </FormProvider>
  );
};
