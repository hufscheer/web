'use client';

import { TradeIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { useSuspenseGame, useSuspenseGameLineup } from '~/api';

type Props = {
  gameId: number;
};

export const PlayerList = ({ gameId }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });

  if (game.gameTeams.length !== 2 || lineup.length !== 2) return null;

  return (
    <div className="grid grid-cols-[50%_1px_50%] py-5">
      {game.gameTeams.map((team, index) => (
        <div
          key={team.gameTeamId}
          className={twMerge('column w-full gap-3 px-5', index === 0 ? 'order-1' : 'order-3')}
        >
          <div className="center-y gap-2">
            <Image
              className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-neutral-50 object-cover"
              src={team.logoImageUrl}
              alt={`${team.gameTeamName} 로고`}
              width={24}
              height={24}
              draggable={false}
              aria-hidden
            />
            <Typography
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              fontSize={14}
              weight="medium"
            >
              {team.gameTeamName}
            </Typography>
          </div>

          {lineup[index].candidatePlayers
            .filter((player) => player.isReplaced)
            .map((player) => (
              <div key={player.id} className="center-y w-full gap-2">
                <span className="center h-7 w-7 rounded-lg bg-neutral-100 text-sm font-medium text-neutral-500">
                  {player.jerseyNumber}
                </span>
                <div className="column gap-1">
                  <Typography fontSize={14} weight="medium" lineHeight="none">
                    {player.playerName}
                  </Typography>
                  <Typography
                    className="center-y gap-0.5"
                    color={colors.neutral500}
                    fontSize={12}
                    weight="medium"
                    asChild
                  >
                    <span>
                      <TradeIcon size={12} />
                      {player.replacedPlayer?.playerName}
                    </span>
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      ))}

      <div className="order-2 h-full w-full bg-neutral-100" aria-hidden />
    </div>
  );
};
