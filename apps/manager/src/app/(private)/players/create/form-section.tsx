'use client';

import { toast } from '@hcc/ui';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';

import { type PlayerFormType, useCreatePlayers } from '~/api';

import { PlayerForm } from '../_components/player-form';

export const FormSection = () => {
  const router = useRouter();

  const { mutateAsync } = useCreatePlayers();
  const handleSubmit = async (data: PlayerFormType) => {
    try {
      await mutateAsync(data);
      toast.success('선수가 생성되었어요.');
      router.back();
    } catch (error) {
      if (error instanceof HTTPError) {
        const body = await error.response
          .json<{ message?: string }>()
          .catch((): { message?: string } => ({}));
        toast.error(body.message ?? '선수 생성에 실패했어요.');
      } else {
        toast.error('선수 생성에 실패했어요.');
      }
    }
  };

  return <PlayerForm className="p-5" onSubmit={handleSubmit} />;
};
