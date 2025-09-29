'use client';

import { toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { type GameFormType, useCreateGames } from '~/api';
import { GameForm } from '../_components/game-form';

type Props = {
  leagueId: number;
};

export const FormSection = ({ leagueId }: Props) => {
  const router = useRouter();
  const { mutate } = useCreateGames();

  const handleSubmit = async (data: GameFormType) => {
    mutate(
      { ...data, leagueId },
      {
        onSuccess: () => {
          toast.success('경기가 생성되었습니다.');
          router.back();
        },
        onError: error => {
          console.log(`[manager/leagues/${leagueId}/create-game]`, error);
          toast.error('경기 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
      },
    );
  };

  return <GameForm leagueId={leagueId} className="p-5" onSubmit={handleSubmit} />;
};
