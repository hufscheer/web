import type { ComponentProps } from 'react';

import { Typography } from '@hcc/ui';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import type { GameTeamType } from '~/api';

interface TeamBoxProps extends ComponentProps<'div'> {
  team: GameTeamType;
}

export const TeamBox = ({ team, className, ...props }: TeamBoxProps) => {
  return (
    <div className={twMerge('center-y h-11 justify-center gap-2.5', className)} {...props}>
      <Image
        className="aspect-square h-6 w-6 overflow-hidden rounded-full border border-neutral-50 object-contain"
        src={team.logoImageUrl ?? '/images/fallback-image.webp'}
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
