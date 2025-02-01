import { LeagueListType } from '@hcc/api';
import { Skeleton } from '@hcc/ui';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ReactElement } from 'react';

import Layout from '@/components/Layout';
import { GAME_STATE } from '@/constants/configs';
import { leaguesPrefetch } from '@/queries/useLeague';
import { leagueDetailPrefetch } from '@/queries/useLeagueDetail';
import { leagueTeamsPrefetch } from '@/queries/useLeagueTeams';
import { GameState } from '@/types/game';

import LeagueFilter from './_components/GameFilter/LeagueFilter';
import RoundFilter from './_components/GameFilter/RoundFilter';
import TeamFilter from './_components/GameFilter/TeamFilter';
import GameList from './_components/GameList';
import getQueryClient from './getQueryClient';

type Games = {
  key: GameState;
  loadingFallback: ReactElement;
};

const GAMES: Games[] = [
  {
    key: GAME_STATE.PLAYING,
    loadingFallback: <Skeleton />,
  },
  {
    key: GAME_STATE.SCHEDULED,
    loadingFallback: <Skeleton />,
  },
  {
    key: GAME_STATE.FINISHED,
    loadingFallback: <Skeleton />,
  },
];

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  const { league, round } = await searchParams;

  const year = 2024;
  const queryClient = getQueryClient();
  const leagues: LeagueListType[] = await leaguesPrefetch(year);
  const inProgress =
    leagues.find(league => league.isInProgress) || leagues?.[0];
  const initialLeagueId = Number(league) || inProgress?.leagueId;

  const leagueDetail = await leagueDetailPrefetch(initialLeagueId);
  const currentRound = Number(round) || leagueDetail.inProgressRound;

  await leagueTeamsPrefetch(initialLeagueId, currentRound);

  return (
    <Layout arrowVisible={false}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LeagueFilter year={year} />
        {initialLeagueId && <RoundFilter initialLeagueId={initialLeagueId} />}
        {initialLeagueId && (
          <TeamFilter leagueId={initialLeagueId} round={currentRound} />
        )}
      </HydrationBoundary>

      {GAMES.map(game => (
        <GameList
          key={game.key}
          state={game.key}
          initialLeagueId={initialLeagueId.toString()}
        />
      ))}
    </Layout>
  );
}
