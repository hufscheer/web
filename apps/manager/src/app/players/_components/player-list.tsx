'use client';

import { ChevronForwardIcon, DeleteForeverIcon } from '@hcc/icons';
import { Typography, toast } from '@hcc/ui';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useSuspensePlayers } from '~/api';
import { AlertDialog } from '~/components/ui/alert-dialog';
import { ROUTES } from '~/constants/routes';

type Props = {
  edit: boolean;
};

export const PlayerList = ({ edit }: Props) => {
  const { data } = useSuspensePlayers();
  const [query, setQuery] = useState<string>('');

  const handlePlayerDelete = (playerId: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        toast.success(`선수가 삭제되었어요. ${playerId}`);
        resolve();
      }, 3000);
    });
  };

  return (
    <Fragment>
      <Typography asChild>
        <input
          className="my-4 w-full rounded-md border border-neutral-200 px-2.5 py-1.5"
          placeholder="선수 검색"
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
        />
      </Typography>

      <div className="h-full overflow-y-auto pb-[92px]">
        {data
          .filter(player => player.name.includes(query) || player.studentNumber.includes(query))
          .map((player, index) => (
            <Fragment key={player.playerId}>
              {index === 0 && <hr className="h-[1px] w-full border-none bg-neutral-100" />}

              <div className="row-between border-neutral-100 border-b py-2">
                <div className="center-y gap-2">
                  <Typography weight="medium">
                    {player.name} ({player.studentNumber})
                  </Typography>
                  <Typography color="var(--color-neutral-500)" fontSize={13} weight="medium">
                    {player.teams.map(team => team.name).join(', ')}
                  </Typography>
                </div>

                {edit ? (
                  <AlertDialog
                    title={`${player.name} 선수를 삭제할게요`}
                    description="삭제한 선수는 다시 복구할 수 없어요."
                    primaryTitle="삭제"
                    onPrimaryClick={() => handlePlayerDelete(player.playerId)}
                  >
                    <span className="cursor-pointer text-[var(--color-danger-600)]">
                      <DeleteForeverIcon size={20} />
                    </span>
                  </AlertDialog>
                ) : (
                  <Link className="center" href={`${ROUTES.PLAYER}/${player.playerId}`}>
                    <ChevronForwardIcon size={20} />
                  </Link>
                )}
              </div>
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
};
