'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDeletePlayers } from '~/api';
import { DeleteOutlineIcon } from '~/desktop/components/icons';
import { Button } from '~/desktop/components/ui/button';
import { ConfirmDialog } from '~/desktop/components/ui/confirm-dialog';
import { Toasts, useToasts } from '~/desktop/components/ui/toast';
import { routes } from '~/desktop/constants/routes';
import { parseHTTPError } from '~/desktop/utils/http-error';

export const PlayerDeleteButton = ({
  playerId,
  playerName,
}: {
  playerId: number;
  playerName: string;
}) => {
  const router = useRouter();
  const { toasts, pushError } = useToasts();
  const [open, setOpen] = useState(false);
  const { mutate: deletePlayer, isPending, isSuccess } = useDeletePlayers();

  const confirm = () =>
    deletePlayer(
      { id: playerId },
      {
        onSuccess: () => router.push(routes.players),
        onError: async (error) => {
          pushError(await parseHTTPError(error, '선수를 삭제하지 못했어요.'));
          setOpen(false);
        },
      },
    );

  return (
    <>
      <Button size="md" color="danger" variant="outline" onClick={() => setOpen(true)}>
        <DeleteOutlineIcon size={16} />
        선수 삭제
      </Button>

      <ConfirmDialog
        open={open}
        title={`${playerName} 선수를 삭제할까요?`}
        description={'소속 팀과 경기 기록에서도 사라져요.\n되돌릴 수 없어요.'}
        pending={isPending || isSuccess}
        onConfirm={confirm}
        onClose={() => setOpen(false)}
      />
      <Toasts items={toasts} />
    </>
  );
};
