'use client';

import { formatTime } from '@hcc/toolkit';
import { Badge, Typography } from '@hcc/ui';
import { Sofia_Sans } from 'next/font/google';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { type GameTeamType, useSuspenseGame } from '~/api';

const Sofia = Sofia_Sans({ subsets: ['latin'] });

type Props = {
  gameId: number;
};

export const Banner = ({ gameId }: Props) => {
  const { data } = useSuspenseGame({ gameId });

  const [homeTeam, awayTeam] = data.gameTeams;

  return (
    <div className="row-between w-full gap-2 px-8 pt-8">
      <div className="flex-1">
        <BannerTeam team={homeTeam} />
      </div>

      <div className="column-center-x gap-2">
        <Badge size="sm">{data.gameQuarter.label}</Badge>
        <div className="center h-9 gap-4">
          <span
            className={twMerge(
              'text-4xl text-neutral-900',
              data.state === 'FINISHED' && 'text-neutral-500',
              Sofia.className,
            )}
          >
            {homeTeam.score}
          </span>
          <div className="column gap-2">
            <span className="aspect-square w-[3px] rounded-full bg-neutral-500" />
            <span className="aspect-square w-[3px] rounded-full bg-neutral-500" />
          </div>
          <span
            className={twMerge(
              'text-4xl text-neutral-900',
              data.state === 'FINISHED' && 'text-neutral-500',
              Sofia.className,
            )}
          >
            {awayTeam.score}
          </span>
        </div>
        <div className="column-center-x whitespace-nowrap text-neutral-500">
          <time className="text-xs font-semibold">
            {formatTime(data.startTime, { format: 'YYYY.MM.DD. (ddd)' })}
          </time>
          <time className="text-xs font-semibold">
            {formatTime(data.startTime, { format: 'HH:mm' })}
          </time>
        </div>
      </div>

      <div className="flex-1">
        <BannerTeam team={awayTeam} />
      </div>
    </div>
  );
};

type BannerTeamProps = {
  team: Pick<GameTeamType, 'logoImageUrl' | 'gameTeamName'>;
};

const BannerTeam = ({ team }: BannerTeamProps) => {
  return (
    <div className="column-center-x shrink-0 justify-end gap-2">
      <Image
        className="h-[66px] w-[66px] rounded-full border border-neutral-100 object-contain"
        src={team.logoImageUrl ?? '/images/fallback-image.webp'}
        alt={`${team.gameTeamName} 로고`}
        width={66}
        height={66}
        priority
        aria-hidden
      />

      <Typography
        className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap"
        fontSize={12}
        weight="semibold"
      >
        {team.gameTeamName}
      </Typography>
    </div>
  );
};
