import {
  getQueryClient,
  dehydrate,
  HydrationBoundary,
  fetchLeagueDetail,
  fetchLeagues,
  fetchLeagueTeams,
  type LeagueListType,
  type LeagueDetailType,
} from '@hcc/api';
import { Skeleton } from '@hcc/ui';
import dayjs from 'dayjs';
import { ReactElement } from 'react';

import Layout from '@/components/Layout';
import { GAME_STATE } from '@/constants/configs';
import { GameState } from '@/types/game';

import LeagueFilter from './_components/GameFilter/LeagueFilter';
import RoundFilter from './_components/GameFilter/RoundFilter';
import TeamFilter from './_components/GameFilter/TeamFilter';
import GameList from './_components/GameList';

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
  searchParams: Promise<{ league: number; round: string }>;
};

const HomePage = async ({ searchParams }: PageProps) => {
  const queryClient = getQueryClient();
  const { league, round } = await searchParams;

  const year: number = dayjs().year();
  const leaguesByYears: LeagueListType[] = await fetchLeagues(year.toString());
  const progressLeague: LeagueListType =
    leaguesByYears.find((league) => league.isInProgress) || leaguesByYears?.[0];
  const initialLeagueId: number = league || progressLeague.leagueId;

  const leagueDetail: LeagueDetailType = await fetchLeagueDetail(initialLeagueId.toString());
  const currentRound: number = Number(round) || leagueDetail.league.inProgressRound;

  await fetchLeagueTeams(initialLeagueId.toString(), currentRound.toString());

  return (
    <Layout arrowVisible={false}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LeagueFilter year={year} />
        {initialLeagueId && <RoundFilter initialLeagueId={initialLeagueId} />}
        {initialLeagueId && <TeamFilter leagueId={initialLeagueId} round={currentRound} />}
      </HydrationBoundary>
      {GAMES.map((game) => (
        <GameList key={game.key} state={game.key} initialLeagueId={initialLeagueId.toString()} />
      ))}
    </Layout>
  );
};

export default HomePage;
