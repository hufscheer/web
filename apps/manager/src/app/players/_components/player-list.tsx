'use client';

import { Fragment } from 'react';
import { useSuspensePlayers } from '~/api';

type Props = {
  edit: boolean;
};

export const PlayerList = ({ edit }: Props) => {
  const { data } = useSuspensePlayers();

  return (
    <Fragment>
      {data.map(player => (
        <div key={player.playerId}>{player.name}</div>
      ))}
    </Fragment>
  );
};
