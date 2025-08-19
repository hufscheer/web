'use client';

import { toast } from '@hcc/ui';
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
      toast.success('선수가 수정되었어요.');
      router.back();
    } catch (error) {
      console.error(error);
      toast.error('선수 수정에 실패했어요.');
    }
  };

  const { data } = useSuspensePlayer({ id });

  return <PlayerForm className="p-5" onSubmit={handleSubmit} initialData={data} />;
};
