'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Badge, colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';
import { type ComponentProps, createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import type { SportType } from '~/api/types';

import { useSuspenseLeagueStatistics, useSuspenseLeagueTopScorers, type LeagueType } from '~/api';
import { routes } from '~/constants/routes';

interface LeagueCardContextType extends LeagueType {
  sportType: SportType;
}

export const LeagueCardContext = createContext<LeagueCardContextType>({} as LeagueCardContextType);

const useLeagueCardContext = () => {
  const context = useContext(LeagueCardContext);

  if (!context) {
    throw new Error('LeagueCard compound components must be used within <LeagueCard.Root>');
  }

  return context;
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.Root
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardRootProps extends ComponentProps<'div'> {
  league: LeagueType;
  sportType: SportType;
}

export const Root = ({ league, sportType, className, children, ...props }: LeagueCardRootProps) => {
  return (
    <LeagueCardContext.Provider value={{ ...league, sportType }}>
      <div
        className={twMerge('column gap-3 rounded-lg border border-gray-100 p-4', className)}
        {...props}
      >
        {children}
      </div>
    </LeagueCardContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.Header
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardHeaderProps extends ComponentProps<'a'> {}

export const Header = ({ className, ...props }: LeagueCardHeaderProps) => {
  const { leagueId, name, sportType } = useLeagueCardContext();

  return (
    <Link
      href={routes.league({ id: leagueId, sport: sportType })}
      className={twMerge('row-between gap-3', className)}
      {...props}
    >
      <div className="center-y gap-3">
        {/* <div className="center relative h-8 w-8 overflow-hidden rounded-full bg-neutral-200 select-none">
          ⚽
        </div> */}
        <Typography weight="medium">{name}</Typography>
      </div>

      <div className="center">
        <ChevronForwardIcon size={24} />
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.Teams
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardTeamsProps extends ComponentProps<'div'> {}

export const Teams = ({ className, ...props }: LeagueCardTeamsProps) => {
  const { leagueId } = useLeagueCardContext();
  const { data } = useSuspenseLeagueStatistics({ leagueId });

  return (
    <div className={twMerge('grid grid-cols-2 gap-4', className)} {...props}>
      <div className="center-y">
        <Badge className="shrink-0" size="sm" variant="primary">
          우승
        </Badge>
        <div className="relative ml-2 h-5 w-5 overflow-hidden rounded-full border border-neutral-100">
          <Image
            className="aspect-square rounded-full object-contain"
            src={data.firstWinnerTeam.logoImageUrl ?? '/images/fallback-image.webp'}
            alt={`${data.firstWinnerTeam.teamName} 로고`}
            width={20}
            height={20}
          />
        </div>
        <Typography
          className="ml-1 overflow-hidden text-ellipsis whitespace-nowrap"
          fontSize={14}
          weight="semibold"
          lineHeight="none"
        >
          {data.firstWinnerTeam.teamName}
        </Typography>
      </div>

      <div className="center-y">
        <Badge className="shrink-0" size="sm" variant="primary">
          준우승
        </Badge>
        <div className="relative ml-2 h-5 w-5 overflow-hidden rounded-full border border-neutral-100">
          <Image
            className="rounded-full object-contain"
            src={data.secondWinnerTeam.logoImageUrl ?? '/images/fallback-image.webp'}
            alt={`${data.secondWinnerTeam.teamName} 로고`}
            width={20}
            height={20}
          />
        </div>
        <Typography
          className="ml-1 overflow-hidden text-ellipsis whitespace-nowrap"
          fontSize={14}
          weight="semibold"
          lineHeight="none"
        >
          {data.secondWinnerTeam.teamName}
        </Typography>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.Scorers
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardScorersProps extends ComponentProps<'div'> {
  limit?: number;
}

export const Scorers = ({ limit = 3, className, ...props }: LeagueCardScorersProps) => {
  const { leagueId } = useLeagueCardContext();
  const { data } = useSuspenseLeagueTopScorers({ leagueId });

  return (
    <div className={twMerge('rounded-md bg-gray-50 p-3', className)} {...props}>
      <Typography fontSize={14} color={colors.neutral500} weight="semibold">
        득점왕
      </Typography>
      {data.length === 0 ? (
        <Typography className="mt-2" fontSize={13} color={colors.neutral500} weight="medium">
          아직 득점 기록이 없어요
        </Typography>
      ) : (
        <ul className="column mt-2 gap-1">
          {data.slice(0, limit).map((scorer) => (
            <li key={scorer.playerId} className="row-between">
              <Typography
                className="flex-1"
                fontSize={13}
                color={colors.neutral500}
                weight="medium"
              >
                #{scorer.ranking}
              </Typography>
              <Typography
                className="flex-1"
                fontSize={13}
                color={colors.neutral500}
                weight="medium"
              >
                {scorer.playerName}
              </Typography>
              <Typography
                className="flex-1 text-right"
                fontSize={13}
                color={colors.neutral500}
                weight="medium"
              >
                {scorer.goalCount}골
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.Statistics
 * -----------------------------------------------------------------------------------------------*/

interface LeagueCardStatisticsProps extends ComponentProps<'div'> {}

export const Statistics = ({ className, ...props }: LeagueCardStatisticsProps) => {
  const { leagueId } = useLeagueCardContext();
  const { data } = useSuspenseLeagueStatistics({ leagueId });

  return (
    <div className={twMerge('center-y rounded-md bg-gray-50 p-3', className)} {...props}>
      <ul className="column w-full gap-1">
        {data.mostCheeredTeam && (
          <li className="row-between gap-1">
            <Typography
              className="flex-1"
              fontSize={13}
              color={colors.neutral500}
              weight="semibold"
            >
              폭풍응원
            </Typography>
            <Typography
              className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
              fontSize={13}
              color={colors.neutral500}
              weight="medium"
            >
              {data.mostCheeredTeam.teamName}
            </Typography>
            <Typography
              className="flex-1 text-right"
              fontSize={13}
              color={colors.neutral500}
              weight="medium"
            >
              {data.mostCheeredTeam.cheerCount ?? 0}회
            </Typography>
          </li>
        )}
        {data.mostCheerTalksTeam && (
          <li className="row-between gap-1">
            <Typography
              className="flex-1"
              fontSize={13}
              color={colors.neutral500}
              weight="semibold"
            >
              댓글폭발
            </Typography>
            <Typography
              className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
              fontSize={13}
              color={colors.neutral500}
              weight="medium"
            >
              {data.mostCheerTalksTeam.teamName}
            </Typography>
            <Typography
              className="flex-1 text-right"
              fontSize={13}
              color={colors.neutral500}
              weight="medium"
            >
              {data.mostCheerTalksTeam.cheerTalksCount ?? 0}회
            </Typography>
          </li>
        )}
      </ul>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * LeagueCard.Divider
 * -----------------------------------------------------------------------------------------------*/

export const Divider = ({ className, ...props }: ComponentProps<'hr'>) => {
  return <hr className={twMerge('h-px w-full border-none bg-gray-100', className)} {...props} />;
};
