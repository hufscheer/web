'use client';

import { useDeleteTeams } from '@hcc/manager-api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { SportType } from '~/types';

import { DeleteOutlineIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { ConfirmDialog } from '~/components/ui/confirm-dialog';
import { Toasts, useToasts } from '~/components/ui/toast';
import { routes } from '~/constants/routes';
import { parseHTTPError } from '~/utils/http-error';

export const TeamDeleteButton = ({
  teamId,
  teamName,
  sportType,
}: {
  teamId: number;
  teamName: string;
  sportType: SportType;
}) => {
  const router = useRouter();
  const { toasts, pushError } = useToasts();
  const [open, setOpen] = useState(false);
  // 성공 뒤에도 화면을 떠날 때까지 눌리지 않게 둔다
  const { mutate: deleteTeam, isPending, isSuccess } = useDeleteTeams();

  const confirm = () =>
    deleteTeam(
      { id: teamId },
      {
        onSuccess: () => router.push(routes.teams(sportType)),
        onError: async (error) => {
          pushError(await parseHTTPError(error, '팀을 삭제하지 못했어요.'));
          setOpen(false);
        },
      },
    );

  return (
    <>
      <Button size="md" color="danger" variant="outline" onClick={() => setOpen(true)}>
        <DeleteOutlineIcon size={16} />팀 삭제
      </Button>

      <ConfirmDialog
        open={open}
        title={`${teamName} 팀을 삭제할까요?`}
        description={'대회 참가 기록과 라인업에서도 사라져요.\n되돌릴 수 없어요.'}
        pending={isPending || isSuccess}
        onConfirm={confirm}
        onClose={() => setOpen(false)}
      />
      <Toasts items={toasts} />
    </>
  );
};
