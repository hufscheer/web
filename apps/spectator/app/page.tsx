import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ReactElement } from 'react';

import Loader from '@/components/Loader';
import { useGameListPrefetch } from '@/queries/useGameList';
import { useLeagueTeamsPrefetch } from '@/queries/useLeagueTeams';
import { LEAGUES_QUERY_KEY, useLeaguesPrefetch } from '@/queries/useLeuage';
import { SPORTS_QUERY_KEY, useSportsPrefetch } from '@/queries/useSports';
import { GameState } from '@/types/game';
import { LeagueType, SportType } from '@/types/league';

import LeagueFilter from './_components/GameFilter/LeagueFilter';
import LeagueTeamFilter from './_components/GameFilter/LeagueTeamFilter';
import RoundFilter from './_components/GameFilter/RoundFilter';
import SportFilter from './_components/GameFilter/SportFilter';
import GameList from './_components/GameList';
import getQueryClient from './getQueryClient';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  const year = Number(searchParams.year) || dayjs().year();
  const queryClient = getQueryClient();
  await useLeaguesPrefetch(year);

  const leagues = queryClient.getQueryData<LeagueType[]>([
    LEAGUES_QUERY_KEY,
    year,
  ]);
  const inProgress = leagues?.[0];
  const initialLeagueId = Number(searchParams.league) || inProgress?.leagueId;

  const sports = queryClient.getQueryData<SportType[]>([
    SPORTS_QUERY_KEY,
    initialLeagueId,
  ]);

  await useLeagueTeamsPrefetch(initialLeagueId);
  await useSportsPrefetch(initialLeagueId);
  await useGameListPrefetch({
    state: 'playing',
    league_id: initialLeagueId?.toString(),
    round:
      (searchParams.round as string) || inProgress?.inProgressRound?.toString(),
    sport_id: searchParams.sports?.toString() || sports?.[0].sportId.toString(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LeagueFilter year={year} />
        {initialLeagueId && <SportFilter leagueId={initialLeagueId} />}
        {inProgress?.inProgressRound && (
          <RoundFilter
            maxRound={inProgress.maxRound}
            inProgressRound={inProgress.inProgressRound}
          />
        )}
        {initialLeagueId && <LeagueTeamFilter leagueId={initialLeagueId} />}

        {GAMES.map(game => (
          <GameList
            key={game.key}
            state={game.key}
            leagueId={initialLeagueId?.toString()}
            round={
              (searchParams.round as string) ||
              inProgress?.inProgressRound?.toString()
            }
            sportId={searchParams.sports?.toString()}
          />
        ))}
      </HydrationBoundary>
    </>
  );
}

type Games = {
  key: GameState;
  // errorFallback: () => ReactElement;
  loadingFallback: ReactElement;
};

const GAMES: Games[] = [
  {
    key: 'playing',
    loadingFallback: <Loader />,
  },
  {
    key: 'scheduled',
    loadingFallback: <Loader />,
  },
  {
    key: 'finished',
    loadingFallback: <Loader />,
  },
];
