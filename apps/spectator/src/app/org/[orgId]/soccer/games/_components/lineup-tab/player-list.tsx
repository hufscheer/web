'use client';

import { Badge, Typography } from '@hcc/ui';
import { Jersey_10 } from 'next/font/google';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { useSuspenseGame, useSuspenseGameLineup } from '~/api';
import { cn } from '~/utils/cn';

const Jersey10 = Jersey_10({ weight: '400' });

type Props = {
  gameId: number;
};

export const PlayerList = ({ gameId }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });

  if (game.gameTeams.length !== 2 || lineup.length !== 2) return null;

  return (
    <div className="grid grid-cols-[1fr_1px_1fr] px-5 py-5">
      {game.gameTeams.map((team, index) => (
        <div
          key={team.gameTeamId}
          className={twMerge('column w-full gap-4', index === 0 ? 'order-1 pr-5' : 'order-3 pl-5')}
        >
          <div className="center-y gap-2">
            <Image
              className="aspect-square size-7 shrink-0 overflow-hidden rounded-full border border-neutral-50 object-contain"
              src={team.logoImageUrl ?? '/images/fallback-image.webp'}
              alt={`${team.gameTeamName} 로고`}
              width={28}
              height={28}
              draggable={false}
              aria-hidden
            />
            <Typography fontSize={16} weight="semibold" asChild>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {team.gameTeamName}
              </span>
            </Typography>
          </div>

          <ul className="column gap-3">
            {lineup[index].starterPlayers.map((player) => (
              <li
                key={player.id}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2"
              >
                <span
                  className="center size-6 rounded-full border-[1.5px] text-[11px] leading-none font-semibold"
                  style={{
                    borderColor: team.teamColor,
                    color: team.teamColor,
                    backgroundColor: `${team.teamColor}33`,
                  }}
                >
                  {player.jerseyNumber}
                </span>
                <Typography fontSize={12} weight="semibold" asChild>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {player.playerName}
                  </span>
                </Typography>
                <span>
                  {player.isCaptain && (
                    <span
                      className={cn(
                        Jersey10.className,
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-[#F87904] font-bold text-white',
                      )}
                    >
                      C
                    </span>
                  )}
                </span>

                <span className="center w-8">
                  {player.position && (
                    <Badge className="w-full" size="sm">
                      {player.position}
                    </Badge>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="order-2 h-full w-px bg-neutral-100" aria-hidden />
    </div>
  );
};
