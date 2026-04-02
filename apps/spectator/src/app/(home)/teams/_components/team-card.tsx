import type { ComponentProps } from 'react';

import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import type { TeamDetailType } from '~/api';

import { routes } from '~/constants/routes';

// import ScoreBadge from './score-badge';

/* -------------------------------------------------------------------------------------------------
 * TeamCard
 * -----------------------------------------------------------------------------------------------*/

const TeamCardRoot = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge('column gap-3 rounded-lg border border-gray-100 p-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TeamCard.Header
 * -----------------------------------------------------------------------------------------------*/

interface TeamCardHeaderProps extends ComponentProps<'a'> {
  team: TeamDetailType;
}

const TeamCardHeader = ({ team, className, ...props }: TeamCardHeaderProps) => {
  return (
    <Link
      href={`/${routes.team(team.teamId)}`}
      className={twMerge('row-between gap-2', className)}
      {...props}
    >
      <div className="center-y min-w-0 flex-1 gap-2">
        {team.logoImageUrl && (
          <div className="center relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-neutral-200">
            <Image
              className="rounded-full object-cover"
              src={team.logoImageUrl}
              alt={`${team.name} 팀 로고`}
              width={28}
              height={28}
            />
          </div>
        )}
        <Typography className="break-words whitespace-normal" weight="medium">
          {team.name}
        </Typography>
      </div>

      <div className="center">
        <ChevronForwardIcon size={24} />
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TeamCard.Content
 * -----------------------------------------------------------------------------------------------*/

const TeamCardContent = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('grid grid-cols-2 gap-5', className)} {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TeamCard.Section
 * -----------------------------------------------------------------------------------------------*/

interface TeamCardSectionProps extends ComponentProps<'div'> {
  title: string;
  icon?: string;
}

const TeamCardSection = ({ title, icon, children, className, ...props }: TeamCardSectionProps) => {
  return (
    <div className={twMerge('column', className)} {...props}>
      <Typography fontSize={14} weight="medium">
        {icon && `${icon} `}
        {title}
      </Typography>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TeamCard.Divider
 * -----------------------------------------------------------------------------------------------*/

const TeamCardDivider = ({ className, ...props }: ComponentProps<'hr'>) => {
  return <hr className={twMerge('h-px w-full border-none bg-neutral-100', className)} {...props} />;
};

/* -----------------------------------------------------------------------------------------------*/

export const TeamCard = Object.assign(TeamCardRoot, {
  Header: TeamCardHeader,
  Content: TeamCardContent,
  Section: TeamCardSection,
  Divider: TeamCardDivider,
});
