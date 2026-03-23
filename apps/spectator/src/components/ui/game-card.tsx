'use client';

import { formatTime } from '@hcc/toolkit';
import { Badge, Button, colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import { createContext, useContext, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import type { GameListType } from '~/api';

import { cn } from '~/utils/cn';

type GameType = { game: GameListType };

const GameCardContext = createContext<GameListType>({} as GameListType);

const useGameCardContext = () => {
  const context = useContext(GameCardContext);

  if (!context) {
    throw new Error('GameCard components must be used within a GameCard');
  }

  return context;
};

/* -------------------------------------------------------------------------------------------------
 * GameCard
 * -----------------------------------------------------------------------------------------------*/

interface GameCardProps extends ComponentProps<'div'>, GameType {}

const GameCardRoot = ({ game, children, className, ...props }: GameCardProps) => {
  return (
    <GameCardContext.Provider value={game}>
      <div className={twMerge('column gap-3 p-2', className)} {...props}>
        {children}
      </div>
    </GameCardContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Container
 * -----------------------------------------------------------------------------------------------*/

const GameCardContainer = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('column', className)} {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Header
 * -----------------------------------------------------------------------------------------------*/

interface GameCardHeaderProps extends ComponentProps<'div'> {
  // game: GameListType;
  showLeagueName?: boolean;
}

const GameCardHeader = ({ showLeagueName, className, ...props }: GameCardHeaderProps) => {
  const { leagueName, round, startTime, gameQuarter } = useGameCardContext();

  return (
    <div className={twMerge('row-between', className)} {...props}>
      <Typography color={colors.neutral500} fontSize={13} weight="medium">
        {showLeagueName && `${leagueName} ‧ `}
        {round === 2 ? '결승' : `${round}강`}
        {' ‧ '}
        {formatTime(startTime, { format: 'MM.DD. HH:mm' })}
      </Typography>
      <Badge size="sm">{gameQuarter}</Badge>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Team
 * -----------------------------------------------------------------------------------------------*/

interface GameCardTeamProps extends ComponentProps<'div'> {
  index: 1 | 2;
}

const GameCardTeam = ({ index, className, ...props }: GameCardTeamProps) => {
  const { gameTeams } = useGameCardContext();
  const team = index === 1 ? gameTeams[0] : gameTeams[1];

  return (
    <div
      className={twMerge('center-y flex-1 justify-between overflow-hidden', className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Image
          className="center h-7 w-7 overflow-hidden rounded-full border border-neutral-100 object-cover select-none"
          src={team.logoImageUrl}
          alt={`${team.gameTeamName} 로고`}
          width={28}
          height={28}
          draggable={false}
        />

        <Typography
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          fontSize={14}
          weight="medium"
        >
          {team.gameTeamName}
        </Typography>
      </div>

      <Typography weight="medium">{team.score}</Typography>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Actions
 * -----------------------------------------------------------------------------------------------*/

interface GameCardActionsProps extends ComponentProps<'div'> {
  onBroadcastClick?: () => void;
  onCheerClick?: () => void;
  onStatsClick?: () => void;
}

const GameCardActions = ({
  onBroadcastClick,
  onCheerClick,
  onStatsClick,
  className,
  ...props
}: GameCardActionsProps) => {
  return (
    <div className={twMerge('column center-y gap-2 self-center pt-2', className)} {...props}>
      {onStatsClick ? (
        <Button
          className="min-w-12 !border !border-neutral-100"
          variant="ghost"
          color="black"
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            onStatsClick();
          }}
        >
          기록
        </Button>
      ) : (
        <>
          <Button
            className="min-w-12 !border !border-neutral-100"
            variant="ghost"
            color="black"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onBroadcastClick?.();
            }}
          >
            중계
          </Button>
          <Button
            className="min-w-12 !border !border-neutral-100"
            variant="ghost"
            color="black"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onCheerClick?.();
            }}
          >
            응원
          </Button>
        </>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Divider
 * -----------------------------------------------------------------------------------------------*/

const GameCardDivider = ({ className, ...props }: ComponentProps<'hr'>) => {
  return <hr className={twMerge('h-px w-full border-none bg-gray-100', className)} {...props} />;
};

/* -----------------------------------------------------------------------------------------------*/

export const GameCard = Object.assign(GameCardRoot, {
  // League: GameCardLeague,
  Container: GameCardContainer,
  Header: GameCardHeader,
  Team: GameCardTeam,
  // Score: GameCardScore,
  Actions: GameCardActions,
  Divider: GameCardDivider,
});
