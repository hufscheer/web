import { ChevronForwardIcon } from '@hcc/icons';
import { formatTime } from '@hcc/toolkit';
import { Badge, Button, colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import type { GameListResponse, GameListType, GameTeamType } from '~/api';
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
 * LeagueCard.Title
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardTitleProps extends ComponentProps<'div'> {
  league: GameListResponse;
}

const LeagueCardTitle = ({ league, className, ...props }: LeagueCardTitleProps) => {
  return (
    <div className={twMerge('row-between gap-3', className)} {...props}>
      <div className="center-y gap-3">
        <div className="center relative h-8 w-8 select-none overflow-hidden rounded-full bg-neutral-200">
          ⚽
        </div>
        <Typography weight="medium">{league.leagueName}</Typography>
      </div>

      <Link href={`/${routes.league(league.leagueId)}`} className="center">
        <ChevronForwardIcon size={24} />
      </Link>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.Game
 * -----------------------------------------------------------------------------------------------*/

const LeagueCardGame = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('column', className)} {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.GameHeader
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardGameHeaderProps extends ComponentProps<'div'> {
  game: GameListType;
}

const LeagueCardGameHeader = ({ game, className, ...props }: LeagueCardGameHeaderProps) => {
  return (
    <div className={twMerge('row-between', className)} {...props}>
      <Typography color={colors.neutral500} fontSize={13} weight="medium">
        {game.round === 2 ? '결승' : `${game.round}강`}
        {' ‧ '}
        {formatTime(game.startTime, { format: 'MM.DD. HH:mm' })}
      </Typography>
      <Badge size="sm">{game.gameQuarter}</Badge>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.GameTeam
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardGameTeamProps extends ComponentProps<'div'> {
  team: GameTeamType;
  position: 'home' | 'away';
}

const LeagueCardGameTeam = ({ team, position, className, ...props }: LeagueCardGameTeamProps) => {
  const isHome = position === 'home';

  return (
    <div
      className={twMerge(
        'center-y flex-1 gap-1 overflow-hidden',
        isHome && 'justify-end',
        className,
      )}
      {...props}
    >
      {isHome && (
        <Typography
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          fontSize={14}
          weight="medium"
        >
          {team.gameTeamName}
        </Typography>
      )}

      <div className="center h-7 w-7 select-none overflow-hidden rounded-full border border-neutral-100">
        <Image
          className="rounded-full object-cover"
          src={team.logoImageUrl}
          alt={`${team.gameTeamName} 로고`}
          width={28}
          height={28}
          draggable={false}
        />
      </div>

      {!isHome && (
        <Typography
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          fontSize={14}
          weight="medium"
        >
          {team.gameTeamName}
        </Typography>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.GameScore
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardGameScoreProps extends ComponentProps<'div'> {
  game: GameListType;
}

const LeagueCardGameScore = ({ game, className, ...props }: LeagueCardGameScoreProps) => {
  if (game.gameTeams.length < 2) return null;

  const home = game.gameTeams[0];
  const away = game.gameTeams[1];

  return (
    <div className={twMerge('center min-w-18', className)} {...props}>
      <Typography weight="medium">
        {home.score} : {away.score}
      </Typography>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.GameActions
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardGameActionsProps extends ComponentProps<'div'> {
  onBroadcastClick?: () => void;
  onCheerClick?: () => void;
}

const LeagueCardGameActions = ({
  onBroadcastClick,
  onCheerClick,
  className,
  ...props
}: LeagueCardGameActionsProps) => {
  return (
    <div className={twMerge('center-y mt-2 gap-2 self-center', className)} {...props}>
      <Button
        className="!border !border-neutral-100 min-w-12"
        variant="ghost"
        color="black"
        size="xs"
        onClick={onBroadcastClick}
      >
        중계
      </Button>
      <Button
        className="!border !border-neutral-100 min-w-12"
        variant="ghost"
        color="black"
        size="xs"
        onClick={onCheerClick}
      >
        응원
      </Button>
    </div>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export const LeagueCard = Object.assign(LeagueCardRoot, {
  Title: LeagueCardTitle,
  Game: LeagueCardGame,
  GameHeader: LeagueCardGameHeader,
  GameTeam: LeagueCardGameTeam,
  GameScore: LeagueCardGameScore,
  GameActions: LeagueCardGameActions,
});
