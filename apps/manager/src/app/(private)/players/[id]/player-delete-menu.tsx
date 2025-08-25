'use client';

import { Typography } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { PlayerDeleteDialog } from '../_components/player-delete-dialog';

export const PlayerDeleteMenu = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <PlayerDeleteDialog id={id} onSuccess={() => router.back()}>
      <Typography className="cursor-pointer" color="var(--color-danger-600)" weight="semibold">
        삭제
      </Typography>
    </PlayerDeleteDialog>
  );
};
