'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDeleteLeagues } from '~/api';
import { DeleteOutlineIcon } from '~/desktop/components/icons';
import { Button } from '~/desktop/components/ui/button';
import { ConfirmDialog } from '~/desktop/components/ui/confirm-dialog';
import { Toasts, useToasts } from '~/desktop/components/ui/toast';
import { routes } from '~/desktop/constants/routes';
import { parseHTTPError } from '~/desktop/utils/http-error';

export const LeagueDeleteButton = ({
  leagueId,
  leagueName,
}: {
  leagueId: number;
  leagueName: string;
}) => {
  const router = useRouter();
  const { toasts, pushError } = useToasts();
  const [open, setOpen] = useState(false);
  const { mutate: deleteLeague, isPending } = useDeleteLeagues();

  const confirm = () =>
    deleteLeague(
      { leagueId },
      {
        onSuccess: () => router.push(routes.leagues),
        onError: async (error) => {
          pushError(await parseHTTPError(error, '대회를 삭제하지 못했어요.'));
          setOpen(false);
        },
      },
    );

  return (
    <>
      <Button size="md" color="danger" variant="outline" onClick={() => setOpen(true)}>
        <DeleteOutlineIcon size={16} />
        대회 삭제
      </Button>

      <ConfirmDialog
        open={open}
        title={`${leagueName} 대회를 삭제할까요?`}
        description={'경기·대진표·응원 기록이 함께 사라져요.\n되돌릴 수 없어요.'}
        pending={isPending}
        onConfirm={confirm}
        onClose={() => setOpen(false)}
      />
      <Toasts items={toasts} />
    </>
  );
};
