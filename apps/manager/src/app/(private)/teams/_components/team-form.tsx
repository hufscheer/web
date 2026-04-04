import type { ComponentProps } from 'react';

import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import type { TeamFormType } from '~/api';

import { SwitchCase } from '~/components/feature';
import { handleFormError } from '~/utils/form-util';

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
      name: initialData?.name ?? '',
      logoImageUrl: initialData?.logoImageUrl ?? '',
      unit: initialData?.unit ?? '',
      teamColor: initialData?.teamColor ?? '',
      teamPlayers: initialData?.teamPlayers ?? [],
    },
  });

  const handleFormSubmit = async (data: TeamFormType) => {
    const result = onSubmit(data);
    if (result instanceof Promise) {
      return result;
    }
    return Promise.resolve();
  };

  return (
    <FormProvider {...form}>
      <form
        className={twMerge('column w-full bg-white h-full overflow-hidden', className)}
        onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
        {...props}
      >
        <div className="shrink-0 px-5 pt-5">
          <StepProgress
            currentStep={step}
            totalSteps={STEPS.length}
            steps={STEPS.map((step) => step.title)}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-3">
          <SwitchCase
            value={step}
            caseBy={{
              0: <TeamBasicInfoStep onNext={() => (step === 0 ? setStep(1) : undefined)} />,
              1: (
                <Suspense fallback={<Spinner />} clientOnly>
                  <TeamPlayersStep onPrevious={() => (step === 1 ? setStep(0) : undefined)} />
                </Suspense>
              ),
            }}
          />
        </div>
      </form>
    </FormProvider>
  );
};
