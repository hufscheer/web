'use client';

import { toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { type GameFormType, useCreateGames } from '~/api';
import { handleFormError } from '~/utils/form-util';

import { getGameFormDefaults, type Step } from './constants';
import { isFullyValid } from './validation';

type UseCreateGameFormProps = {
  leagueId: number;
};

export const useCreateGameForm = ({ leagueId }: UseCreateGameFormProps) => {
  const router = useRouter();
  const { mutate } = useCreateGames();
  const [step, setStep] = useState<Step>(0);

  const form = useForm<GameFormType>({
    defaultValues: getGameFormDefaults(leagueId),
  });

  const goNext = () => setStep((prev) => Math.min(prev + 1, 2) as Step);
  const goPrev = () => setStep((prev) => Math.max(prev - 1, 0) as Step);
  const goTo = (target: Step) => setStep(target);

  const submit = form.handleSubmit((data) => {
    if (!isFullyValid(data)) {
      toast.warning('모든 단계를 완료해야 경기 생성이 가능해요');
      return;
    }

    mutate(
      { ...data, leagueId, quarter: 'PRE_GAME', state: 'SCHEDULED' },
      {
        onSuccess: () => {
          toast.success('경기가 생성되었어요');
          router.push(`/leagues/${leagueId}`);
        },
        onError: (error) => {
          console.error(`[manager/leagues/${leagueId}/create-game]`, error);
          toast.error('경기 생성에 실패했어요 잠시 후 다시 시도해주세요');
        },
      },
    );
  }, handleFormError);

  return { form, step, goNext, goPrev, goTo, submit };
};
