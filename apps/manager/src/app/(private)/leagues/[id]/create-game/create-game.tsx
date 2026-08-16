'use client';

import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { FormProvider } from 'react-hook-form';

import { SwitchCase } from '~/components/feature';

import { StepProgress } from '../_components/step-progress';
import { STEPS } from './constants';
import { BasicInfoStep } from './steps/basic-info-step';
import { LineupStep } from './steps/lineup-step';
import { VideoStep } from './steps/video-step';
import { useCreateGameForm } from './use-create-game-form';

type Props = {
  leagueId: number;
};

export const CreateGame = ({ leagueId }: Props) => {
  const { form, step, goNext, goPrev, submit } = useCreateGameForm({ leagueId });

  return (
    <FormProvider {...form}>
      <form className="flex h-full w-full flex-col bg-white p-5" onSubmit={submit}>
        <StepProgress currentStep={step} totalSteps={STEPS.length} steps={[...STEPS]} />

        <div className="mt-6 flex-1 overflow-hidden">
          <SwitchCase
            value={step}
            caseBy={{
              0: (
                <Suspense fallback={<Spinner className="self-center" />} clientOnly>
                  <BasicInfoStep leagueId={leagueId} onNext={goNext} onSubmit={submit} />
                </Suspense>
              ),
              1: <LineupStep leagueId={leagueId} onNext={goNext} onPrevious={goPrev} />,
              2: <VideoStep onPrevious={goPrev} />,
            }}
          />
        </div>
      </form>
    </FormProvider>
  );
};
