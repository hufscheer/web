import type { ComponentProps } from 'react';

import { ChevronForwardIcon } from '@hcc/icons';
import { Button, Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import type { GameStateType, GameType } from '~/api';

import { useOrganizationId } from '~/hooks/useOrganizationId';

/* -------------------------------------------------------------------------------------------------
 * GameCard
 * -----------------------------------------------------------------------------------------------*/

const GameCardRoot = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={twMerge('column gap-3 border-gray-100 border-y p-4', className)} {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Header
 * -----------------------------------------------------------------------------------------------*/

interface GameCardHeaderProps extends ComponentProps<'a'> {
  league: GameType;
}

const GameCardHeader = ({ league, className, ...props }: GameCardHeaderProps) => {
  const { organizationId } = useOrganizationId();

  return (
    <Link
      href={{ pathname: `/leagues/${league.leagueId}`, query: { organizationId } }}
      className={twMerge('row-between gap-3', className)}
      {...props}
    >
      <div className="center-y gap-3">
        <Typography weight="medium">{league.leagueName}</Typography>
      </div>

      <div className="center">
        <ChevronForwardIcon size={24} />
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------------------------------
 * GameCard.Match
 * -----------------------------------------------------------------------------------------------*/
interface GameCardMatchProps {
  gameId: number;
  time: string;
  round: string;
  status: GameStateType;
  team1: GameType['gameTeams'][0];
  team2: GameType['gameTeams'][0];
}

const GameCardMatch = ({ gameId, time, round, status, team1, team2 }: GameCardMatchProps) => {
  const router = useRouter();
  const { organizationId } = useOrganizationId();

  const statusStyles = {
    PLAYING: {
      bg: 'rgba(52, 199, 89, 0.1)',
      accent: '#1ADA3B',
      time: '#1ADA3B',
    },
    SCHEDULED: {
      bg: 'var(--color-primary-100)',
      accent: 'transparent',
      time: 'var(--color-primary-600)',
    },
    FINISHED: {
      bg: 'var(--color-gray-400)',
      accent: 'transparent',
      time: 'white',
    },
  };

  const current = statusStyles[status];
  const showAccent = status === 'PLAYING';

  const getWinnerInfo = () => {
    if (status !== 'FINISHED') return null;

    if ((team1.score ?? 0) > (team2.score ?? 0)) return 'team1';
    if ((team1.score ?? 0) < (team2.score ?? 0)) return 'team2';

    if ((team1.pkScore ?? 0) > (team2.pkScore ?? 0)) return 'team1';
    if ((team1.pkScore ?? 0) < (team2.pkScore ?? 0)) return 'team2';

    return 'draw';
  };

  const winner = getWinnerInfo();
  const isFinished = status === 'FINISHED';

  const getTeamNameColor = (target: 'team1' | 'team2') => {
    if (!isFinished || winner === 'draw' || winner === null || winner === target) {
      return '#000000';
    }
    return '#A3A3A3';
  };
  return (
    <div className="my-2 flex overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition-all hover:shadow-md">
      {showAccent && <div className="w-1.5" style={{ backgroundColor: current.accent }} />}
      <div className="flex flex-1 items-center">
        {/* 경기 시간 및 라운드 */}
        <div
          className={twMerge('flex h-full items-center transition-colors')}
          style={{ backgroundColor: current.bg }}
        >
          <div className="column min-w-[64px] items-center justify-center border-r border-neutral-50">
            <Typography
              fontSize={14}
              weight="bold"
              style={{ color: current.time }}
              className={twMerge(status === 'PLAYING' && 'animate-pulse')}
            >
              {time}
            </Typography>
            <Typography fontSize={12} className="text-neutral-400">
              {round}
            </Typography>
          </div>
        </div>

        {/* 팀 정보 및 점수 */}
        <div className="column flex-1 gap-3 p-4">
          <div className="row-between items-center gap-2">
            <div className="center-y gap-3">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-neutral-50">
                <Image
                  src={team1.logoImageUrl ?? '/images/fallback-image.webp'}
                  alt={team1.gameTeamName}
                  className="aspect-square h-full w-full object-contain"
                  width={20}
                  height={20}
                />
              </div>
              <Typography
                fontSize={15}
                weight="medium"
                style={{ color: getTeamNameColor('team1') }}
              >
                {team1.gameTeamName}
              </Typography>
            </div>
            {team1.score !== undefined && (
              <Typography fontSize={18} weight="bold" style={{ color: getTeamNameColor('team1') }}>
                {team1.score}
              </Typography>
            )}
          </div>

          <div className="row-between items-center gap-2">
            <div className="center-y gap-3">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-neutral-50">
                <Image
                  src={team2.logoImageUrl ?? '/images/fallback-image.webp'}
                  alt={team2.gameTeamName}
                  className="h-full w-full object-contain"
                  width={20}
                  height={20}
                />
              </div>
              <Typography
                fontSize={15}
                weight="medium"
                style={{ color: getTeamNameColor('team2') }}
              >
                {team2.gameTeamName}
              </Typography>
            </div>
            {team2.score !== undefined && (
              <Typography fontSize={18} weight="bold" style={{ color: getTeamNameColor('team2') }}>
                {team2.score}
              </Typography>
            )}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="column gap-2 p-4 pl-2">
          {(status === 'PLAYING' || status === 'SCHEDULED') && (
            <>
              <Button
                size="sm"
                color="black"
                variant="subtle"
                onClick={() => router.push(`/games/${gameId}?organizationId=${organizationId}`)}
                className="h-8 rounded-lg border-neutral-200 px-4 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
              >
                중계
              </Button>
              <Button
                size="sm"
                color="black"
                variant="subtle"
                onClick={() =>
                  router.push(`/games/${gameId}?cheer=1&organizationId=${organizationId}`)
                }
                className="h-8 rounded-lg border-neutral-200 px-4 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
              >
                응원
              </Button>
            </>
          )}
          {status === 'FINISHED' && (
            <Button
              size="sm"
              color="black"
              variant="subtle"
              onClick={() => router.push(`/games/${gameId}?organizationId=${organizationId}`)}
              className="h-8 rounded-lg border-neutral-200 px-4 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
            >
              기록
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const GameCard = Object.assign(GameCardRoot, {
  Header: GameCardHeader,
  Match: GameCardMatch,
});
