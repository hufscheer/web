import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { type ComponentProps, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { GameFormType } from '~/api';
import { GameVideoStep } from '~/app/(private)/leagues/[id]/_components/game-form/game-video-step';
import { SwitchCase } from '~/components/feature';
import { handleFormError } from '~/utils/form-util';
import { GameBasicInfoStep } from './game-basic-info-step';
import { StepProgress } from './step-progress';

type Props = {
  leagueId: number;
  onSubmit: (data: GameFormType) => Promise<void> | void;
  initialData?: Partial<GameFormType>;
} & Omit<ComponentProps<'form'>, 'onSubmit'>;

const STEPS = [
  { id: 'basic', title: '경기 정보' },
  { id: 'lineup', title: '라인업' },
  { id: 'video', title: '경기 영상' },
] as const;

export const GameForm = ({ leagueId, className, onSubmit, initialData, ...props }: Props) => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const form = useForm<GameFormType>({
    defaultValues: { ...initialData },
  });

  const handleFormSubmit = async (data: GameFormType) => {
    const result = onSubmit(data);
    if (result instanceof Promise) {
      return result;
    }
    return Promise.resolve();
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
            0: (
              <Suspense fallback={<Spinner className="self-center" />} clientOnly>
                <GameBasicInfoStep
                  leagueId={leagueId}
                  onNext={() => (step === 0 ? setStep(1) : undefined)}
                />
              </Suspense>
            ),
            1: null,
            2: <GameVideoStep onPrevious={() => (step === 2 ? setStep(1) : undefined)} />,
          }}
        />
      </form>
    </FormProvider>
  );
};
