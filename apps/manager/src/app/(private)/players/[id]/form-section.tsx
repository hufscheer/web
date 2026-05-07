'use client';

import { toast } from '@hcc/ui';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';

import { type PlayerFormType, useSuspensePlayer, useUpdatePlayers } from '~/api';

import { PlayerForm } from '../_components/player-form';

type Props = {
  id: number;
};

export const FormSection = ({ id }: Props) => {
  const router = useRouter();

  const { mutateAsync } = useUpdatePlayers();
  const handleSubmit = async (data: PlayerFormType) => {
    try {
      await mutateAsync({ id, ...data });
      toast.success('선수가 수정되었어요');
      router.back();
    } catch (error) {
      if (error instanceof HTTPError) {
        const body = await error.response
          .json<{ message?: string }>()
          .catch((): { message?: string } => ({}));
        toast.error(body.message ?? '선수 수정에 실패했어요');
      } else {
        toast.error('선수 수정에 실패했어요');
      }
    }
  };

  const { data } = useSuspensePlayer({ id });

  return <PlayerForm className="p-5" onSubmit={handleSubmit} initialData={data} />;
};
