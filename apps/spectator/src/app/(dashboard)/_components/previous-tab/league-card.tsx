import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import type { LeagueType } from '~/api';
import { routes } from '~/constants/routes';

/* -------------------------------------------------------------------------------------------------
 * LeagueCard
 * -----------------------------------------------------------------------------------------------*/

const LeagueCardRoot = ({ children, className, ...props }: ComponentProps<'div'>) => {
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
 * LeagueCard.Header
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardHeaderProps extends ComponentProps<'div'> {
  league: LeagueType;
}

const LeagueCardHeader = ({ league, className, ...props }: LeagueCardHeaderProps) => {
  return (
    <div className={twMerge('row-between gap-3', className)} {...props}>
      <div className="center-y gap-3">
        <div className="center relative h-8 w-8 select-none overflow-hidden rounded-full bg-neutral-200">
          ⚽
        </div>
        <Typography weight="medium">{league.name}</Typography>
      </div>

      <Link href={`/${routes.league(league.leagueId)}`} className="center">
        <ChevronForwardIcon size={24} />
      </Link>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.Divider
 * -----------------------------------------------------------------------------------------------*/

const LeagueCardDivider = ({ className, ...props }: ComponentProps<'hr'>) => {
  return <hr className={twMerge('h-px w-full border-none bg-gray-100', className)} {...props} />;
};

export const LeagueCard = Object.assign(LeagueCardRoot, {
  Header: LeagueCardHeader,
  Divider: LeagueCardDivider,
});
