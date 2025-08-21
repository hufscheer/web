'use client';

import { ChevronForwardIcon, DeleteForeverIcon } from '@hcc/icons';
import { Typography, toast } from '@hcc/ui';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useDeletePlayers, useSuspensePlayers } from '~/api';
import { AlertDialog } from '~/components/ui/alert-dialog';
import { routes } from '~/constants/routes';

type Props = {
  edit: boolean;
};

export const PlayerList = ({ edit }: Props) => {
  const { data } = useSuspensePlayers();
  const [query, setQuery] = useState<string>('');

  const { mutateAsync } = useDeletePlayers();

  const handlePlayerDelete = async (id: number): Promise<void> => {
    try {
      await mutateAsync({ id });
      toast.success('선수가 삭제되었어요.');
    } catch (error) {
      console.error(error);
      toast.error('선수 삭제에 실패했어요.');
    }
  };

  return (
    <Fragment>
      <Typography asChild>
        <input
          className="my-4 w-full rounded-lg border border-neutral-100 px-2.5 py-1.5"
          placeholder="선수 검색"
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
        />
      </Typography>

      <div className="column h-full gap-3 overflow-y-auto pb-[92px]">
        {data
          .filter(player => player.name.includes(query) || player.studentNumber.includes(query))
          .map(player => (
            <div
              key={player.playerId}
              className="row-between rounded-lg border border-neutral-100 px-4 py-3"
            >
              <div className="column gap-1.5">
                <Typography weight="medium" lineHeight="none">
                  {player.name} ({player.studentNumber})
                </Typography>
                {player.teams && player.teams.length > 0 && (
                  <Typography
                    color="var(--color-neutral-500)"
                    fontSize={12}
                    weight="medium"
                    lineHeight="none"
                  >
                    {player.teams.map(team => team.name).join(', ')}
                  </Typography>
                )}
              </div>

              {edit ? (
                <AlertDialog
                  title="삭제한 선수는 다시 복구할 수 없어요"
                  description="정말 삭제할까요?"
                  primaryTitle="삭제"
                  onPrimaryClick={() => handlePlayerDelete(player.playerId)}
                >
                  <span className="cursor-pointer text-[var(--color-danger-600)]">
                    <DeleteForeverIcon size={24} />
                  </span>
                </AlertDialog>
              ) : (
                <Link className="center" href={`/${routes.player}/${player.playerId}`}>
                  <ChevronForwardIcon size={24} />
                </Link>
              )}
            </div>
          ))}
      </div>
    </Fragment>
  );
};
