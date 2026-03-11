'use client';

import { colors, Typography, toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';

import { useDeleteGames } from '~/api';
import { AlertDialog } from '~/components/ui';

type Props = {
  leagueId: number;
  gameId: number;
};

export const GameDeleteMenu = ({ leagueId, gameId }: Props) => {
  const router = useRouter();
  const { mutateAsync } = useDeleteGames();

  const handleGameDelete = async (): Promise<void> => {
    try {
      await mutateAsync({ leagueId, gameId });
      toast.success('게임이 삭제되었어요.');
      router.back();
    } catch (error) {
      console.error(`[manager/leagues/${leagueId}/${gameId}`, error);
      toast.error('게임 삭제에 실패했어요.');
    }
  };

  return (
    <AlertDialog
      title="삭제한 게임은 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryTitle="삭제"
      onPrimaryClick={handleGameDelete}
    >
      <Typography className="cursor-pointer" color={colors.danger600} weight="semibold">
        삭제
      </Typography>
    </AlertDialog>
  );
};
