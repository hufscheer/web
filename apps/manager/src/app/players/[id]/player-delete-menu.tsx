'use client';

import { Typography, toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { useDeletePlayers } from '~/api';
import { AlertDialog } from '~/components/ui';

export const PlayerDeleteMenu = ({ id }: { id: number }) => {
  const router = useRouter();
  const { mutateAsync } = useDeletePlayers();

  const handlePlayerDelete = async (playerId: number): Promise<void> => {
    try {
      await mutateAsync({ id: playerId });
      toast.success('선수가 삭제되었어요.');
      router.back();
    } catch (error) {
      console.error(error);
      toast.error('선수 삭제에 실패했어요.');
    }
  };

  return (
    <AlertDialog
      title="삭제한 선수는 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryTitle="삭제"
      onPrimaryClick={() => handlePlayerDelete(id)}
    >
      <Typography className="cursor-pointer" color="var(--color-danger-600)" weight="semibold">
        삭제
      </Typography>
    </AlertDialog>
  );
};
