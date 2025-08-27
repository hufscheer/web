'use client';

import { Typography } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { TeamDeleteDialog } from '../_components/team-delete-dialog';

export const TeamDeleteMenu = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <TeamDeleteDialog id={id} onSuccess={() => router.back()}>
      <Typography className="cursor-pointer" color="var(--color-danger-600)" weight="semibold">
        삭제
      </Typography>
    </TeamDeleteDialog>
  );
};
