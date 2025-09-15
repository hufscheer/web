'use client';

import { Typography } from '@hcc/ui';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  type GameTeamPlayerType,
  type GameTeamType,
  useSuspenseGame,
  useSuspenseGameLineup,
} from '~/api';
import { Ground as BaseGround } from './ground';

type Props = {
  gameId: number;
};

export const Ground = ({ gameId }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });

  if (game.gameTeams.length !== 2 || lineup.length !== 2) return null;

  const [homeTeam, awayTeam] = game.gameTeams;
  const [homePlayers, awayPlayers] = lineup;

  return (
    <div className="column m-5 rounded-lg border border-neutral-100 bg-white">
      <TeamBox className="order-1" team={homeTeam} />
      <TeamBox className="order-3" team={awayTeam} />

      <BaseGround className="order-2">
        <BaseGround.PlayerField>
          {groupPlayers(homePlayers.starterPlayers).map(group => (
            <div key={uuid()} className="center-y w-full max-w-[420px]">
              {group.map(player => (
                <BaseGround.Player key={player.id} player={player} />
              ))}
            </div>
          ))}
        </BaseGround.PlayerField>
        <BaseGround.PlayerField className="flex-col-reverse">
          {groupPlayers(awayPlayers.starterPlayers).map(group => (
            <div key={uuid()} className="center-y w-full max-w-[420px]">
              {group.map(player => (
                <BaseGround.Player key={player.id} player={player} />
              ))}
            </div>
          ))}
        </BaseGround.PlayerField>
      </BaseGround>
    </div>
  );
};

interface TeamBoxProps extends ComponentProps<'div'> {
  team: GameTeamType;
}

const TeamBox = ({ team, className, ...props }: TeamBoxProps) => {
  return (
    <div className={twMerge('center-y h-11 justify-center gap-2.5', className)} {...props}>
      <Image
        className="h-6 w-6 overflow-hidden rounded-full border border-neutral-50 object-cover"
        src={team.logoImageUrl}
        alt={`${team.gameTeamName} 로고`}
        width={24}
        height={24}
        draggable={false}
        aria-hidden
      />
      <Typography fontSize={15} weight="medium">
        {team.gameTeamName}
      </Typography>
    </div>
  );
};

const groupPlayers = (players: GameTeamPlayerType[]) => {
  const { captain, regularPlayers } = players.reduce<{
    captain: GameTeamPlayerType | undefined;
    regularPlayers: GameTeamPlayerType[];
  }>(
    (acc, player) => {
      if (player.isCaptain) acc.captain = player;
      else acc.regularPlayers.push(player);
      return acc;
    },
    { captain: undefined, regularPlayers: [] },
  );

  const groups = regularPlayers.reduce<GameTeamPlayerType[][]>((acc, player, index) => {
    const groupIndex = Math.floor(index / 5);
    if (index % 5 === 0) acc[groupIndex] = [];
    acc[groupIndex].push(player);
    return acc;
  }, []);

  if (groups.length === 0) return captain ? [[captain]] : [];

  const lastGroup = groups[groups.length - 1];

  if (captain) {
    if (lastGroup.length < 5) lastGroup.push(captain);
    else groups.push([captain]);
  }

  return groups;
};

const uuid = () => {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};
