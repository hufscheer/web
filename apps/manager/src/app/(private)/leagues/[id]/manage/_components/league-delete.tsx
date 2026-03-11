'use client';

import { colors, Typography, toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';

import { useDeleteLeagues } from '~/api';
import { AlertDialog } from '~/components/ui';

type Props = {
  leagueId: number;
};

export const LeagueDeleteMenu = ({ leagueId }: Props) => {
  const router = useRouter();
  const { mutateAsync } = useDeleteLeagues();

  const handleLeagueDelete = async (): Promise<void> => {
    try {
      await mutateAsync({ leagueId });
      toast.success('대회를 삭제했어요');
      router.push('/leagues');
    } catch (_error) {
      toast.error('대회 삭제에 실패했어요');
    }
  };

  return (
    <AlertDialog
      title="삭제한 대회는 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryTitle="삭제"
      onPrimaryClick={handleLeagueDelete}
    >
      <Typography className="cursor-pointer" color={colors.danger600} weight="semibold">
        삭제
      </Typography>
    </AlertDialog>
  );
};
