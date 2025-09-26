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
 * GameCard
 * -----------------------------------------------------------------------------------------------*/

const GameCardRoot = ({ children, className, ...props }: ComponentProps<'div'>) => {
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
 * GameCard.League
 * -----------------------------------------------------------------------------------------------*/

interface GameCardLeagueProps extends ComponentProps<'div'> {
  league: GameListResponse;
}

const GameCardLeague = ({ league, className, ...props }: GameCardLeagueProps) => {
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
 * GameCard.Container
 * -----------------------------------------------------------------------------------------------*/

const GameCardContainer = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('column', className)} {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameList.Header
 * -----------------------------------------------------------------------------------------------*/

interface GameCardHeaderProps extends ComponentProps<'div'> {
  game: GameListType;
}

const GameCardHeader = ({ game, className, ...props }: GameCardHeaderProps) => {
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
 * GameCard.Team
 * -----------------------------------------------------------------------------------------------*/

interface GameCardTeamProps extends ComponentProps<'div'> {
  team: GameTeamType;
  position: 'home' | 'away';
}

const GameCardTeam = ({ team, position, className, ...props }: GameCardTeamProps) => {
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
 * GameCard.Score
 * -----------------------------------------------------------------------------------------------*/

interface GameCardScoreProps extends ComponentProps<'div'> {
  game: GameListType;
}

const GameCardScore = ({ game, className, ...props }: GameCardScoreProps) => {
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
 * GameCard.Actions
 * -----------------------------------------------------------------------------------------------*/

interface GameCardActionsProps extends ComponentProps<'div'> {
  onBroadcastClick?: () => void;
  onCheerClick?: () => void;
}

const GameCardActions = ({
  onBroadcastClick,
  onCheerClick,
  className,
  ...props
}: GameCardActionsProps) => {
  return (
    <div className={twMerge('center-y gap-2 self-center pt-2', className)} {...props}>
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

/* -------------------------------------------------------------------------------------------------
 * GameCard.Divider
 * -----------------------------------------------------------------------------------------------*/

const GameCardDivider = ({ className, ...props }: ComponentProps<'hr'>) => {
  return <hr className={twMerge('h-px w-full border-none bg-gray-100', className)} {...props} />;
};

/* -----------------------------------------------------------------------------------------------*/

export const GameCard = Object.assign(GameCardRoot, {
  League: GameCardLeague,
  Container: GameCardContainer,
  Header: GameCardHeader,
  Team: GameCardTeam,
  Score: GameCardScore,
  Actions: GameCardActions,
  Divider: GameCardDivider,
});
