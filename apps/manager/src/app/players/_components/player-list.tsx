'use client';

import { ChevronForwardIcon, DeleteForeverIcon, DeleteForeverOutlineIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { Fragment } from 'react';
import { useSuspensePlayers } from '~/api';
import { ROUTES } from '~/constants/routes';

type Props = {
  edit: boolean;
};

export const PlayerList = ({ edit }: Props) => {
  const { data } = useSuspensePlayers();

  return (
    <Fragment>
      <Typography asChild>
        <input
          className="my-4 w-full rounded-md border border-neutral-200 px-2.5 py-1.5"
          placeholder="선수 검색"
        />
      </Typography>

      <div>
        {data.map((player, index) => (
          <Fragment key={player.playerId}>
            {index === 0 && <hr className="h-[1px] w-full border-none bg-neutral-100" />}

            <div className="row-between border-neutral-100 border-b py-2">
              <div className="center-y gap-1">
                <Typography weight="medium">{player.name}</Typography>
                <Typography color="var(--color-neutral-500)" fontSize={14}>
                  {player.teams.map(team => team.name).join(', ')}
                </Typography>
              </div>

              {edit ? (
                <button type="button" className="cursor-pointer text-[var(--color-danger-600)]">
                  <DeleteForeverIcon size={20} />
                </button>
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
