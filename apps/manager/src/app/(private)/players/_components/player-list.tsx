'use client';

import { ChevronForwardIcon, DeleteForeverIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useSuspensePlayers } from '~/api';
import { routes } from '~/constants/routes';
import { PlayerDeleteDialog } from './player-delete-dialog';

type Props = {
  edit: boolean;
};

export const PlayerList = ({ edit }: Props) => {
  const { data } = useSuspensePlayers();
  const [query, setQuery] = useState<string>('');

  return (
    <Fragment>
      <Typography asChild>
        <input
          className="my-4 w-full rounded-lg border border-neutral-100 px-3 py-2.5"
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
                <PlayerDeleteDialog id={player.playerId}>
                  <span className="cursor-pointer text-[var(--color-danger-600)]">
                    <DeleteForeverIcon size={24} />
                  </span>
                </PlayerDeleteDialog>
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
