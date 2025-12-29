import { formatTime } from '@hcc/toolkit';
import { Badge, Button, colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import type { GameListType, TeamDetailType } from '~/api';

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

interface TeamCardHeaderProps extends ComponentProps<'div'> {
  team: TeamDetailType;
}

const TeamCardHeader = ({ team, className, ...props }: TeamCardHeaderProps) => {
  return (
    <div className={twMerge('row-between gap-3', className)} {...props}>
      <div className="center-y min-w-0 flex-1 gap-3">
        {team.logoImageUrl && (
          <div className="center relative h-8 w-8 overflow-hidden rounded-full bg-neutral-200">
            <Image
              className="rounded-full object-cover"
              src={team.logoImageUrl}
              alt={`${team.name} 팀 로고`}
              width={28}
              height={28}
            />
          </div>
        )}
        <Typography className="whitespace-normal break-words" weight="medium">
          {team.name}
        </Typography>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TeamCard.Content
 * -----------------------------------------------------------------------------------------------*/

const TeamCardContent = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('flex flex-col gap-5', className)} {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Header
 * -----------------------------------------------------------------------------------------------*/

interface GameCardHeaderProps extends ComponentProps<'div'> {
  game: GameListType;
}

const GameCardHeader = ({ game, className, ...props }: GameCardHeaderProps) => {
  return (
    <div className={twMerge('row-between', className)} {...props}>
      <Typography color={colors.neutral500} fontSize={13} weight="medium">
        {game.leagueName}
        {' ‧ '}
        {game.round === 2 ? '결승' : `${game.round}강`}
        {' ‧ '}
        {formatTime(game.startTime, { format: 'MM.DD. HH:mm' })}
      </Typography>
      <Badge size="sm">{game.gameQuarter}</Badge>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Actions
 * -----------------------------------------------------------------------------------------------*/

interface GameCardActionsProps extends ComponentProps<'div'> {
  // onBroadcastClick?: () => void;
  // onCheerClick?: () => void;
  onStatsClick?: () => void;
}

const GameCardActions = ({ onStatsClick, className, ...props }: GameCardActionsProps) => {
  return (
    <div className={twMerge('center-y gap-2 self-center pt-2', className)} {...props}>
      <Button
        className="!border !border-neutral-100 min-w-12"
        variant="ghost"
        color="black"
        size="xs"
        onClick={e => {
          e.stopPropagation();
          onStatsClick?.();
        }}
      >
        기록
      </Button>
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
  GameHeader: GameCardHeader,
  Actions: GameCardActions,
  Section: TeamCardSection,
  Divider: TeamCardDivider,
});
