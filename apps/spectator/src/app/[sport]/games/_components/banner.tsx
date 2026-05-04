'use client';

import { formatTime } from '@hcc/toolkit';
import { Badge, Typography } from '@hcc/ui';
import { Sofia_Sans } from 'next/font/google';
import Image from 'next/image';

import { type GameTeamType, useSuspenseGame } from '~/api';
import { cn } from '~/utils/cn';

const Sofia = Sofia_Sans({ subsets: ['latin'] });

type Props = {
  gameId: number;
};

export const Banner = ({ gameId }: Props) => {
  const { data } = useSuspenseGame({ gameId });

  const [homeTeam, awayTeam] = data.gameTeams;

  return (
    <div>
      <div className="column-center-x p-1 whitespace-nowrap text-neutral-500">
        <time dateTime={data.startTime} className="text-xs font-semibold">
          {formatTime(data.startTime, { format: 'YYYY.MM.DD. (ddd) HH:mm' })}
        </time>
      </div>
      <div className="row-between w-full gap-2 bg-(--color-primary-100) px-10 pt-4 pb-2">
        <div className="flex-1">
          <BannerTeam team={homeTeam} />
        </div>

        <div className="column-center-x gap-2">
          <Badge size="sm" variant={data.state === 'PLAYING' ? 'danger' : 'default'}>
            {data.gameQuarter.label}
          </Badge>
          <div className="center h-9 gap-4">
            <span
              className={cn(
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
              className={cn(
                'text-4xl text-neutral-900',
                data.state === 'FINISHED' && 'text-neutral-500',
                Sofia.className,
              )}
            >
              {awayTeam.score}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <BannerTeam team={awayTeam} />
        </div>
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
        className="h-10 w-10 rounded-full border border-neutral-100 object-contain"
        src={team.logoImageUrl ?? '/images/fallback-image.webp'}
        alt={`${team.gameTeamName} 로고`}
        width={40}
        height={40}
        priority
        aria-hidden
      />

      <Typography
        className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap"
        fontSize={14}
        weight="medium"
      >
        {team.gameTeamName}
      </Typography>
    </div>
  );
};
