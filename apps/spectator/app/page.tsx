import {
  dehydrate,
  getQueryClient,
  HydrationBoundary,
  LeagueListType,
  fetchLeagueDetail,
  fetchLeagues,
  fetchLeagueTeams,
} from '@hcc/api';

import Layout from '@/components/Layout';
import { GAME_STATE } from '@/constants/configs';

import LeagueFilter from './_components/GameFilter/LeagueFilter';
import RoundFilter from './_components/GameFilter/RoundFilter';
import TeamFilter from './_components/GameFilter/TeamFilter';
import GameList from './_components/GameList';

const GAMES = [
  { key: GAME_STATE.PLAYING },
  { key: GAME_STATE.SCHEDULED },
  { key: GAME_STATE.FINISHED },
];

type PageProps = {
  searchParams: Promise<{ league: number; round: string }>;
};

const HomePage = async ({ searchParams }: PageProps) => {
  const { league, round } = await searchParams;

  const year = 2024;
  const queryClient = getQueryClient();
  const leagues: LeagueListType[] = await fetchLeagues(year.toString());
  const inProgress: LeagueListType =
    leagues.find(league => league.isInProgress) || leagues?.[0];
  const initialLeagueId: number = league || inProgress.leagueId;

  const leagueDetail = await fetchLeagueDetail(initialLeagueId.toString());
  const currentRound: number =
    Number(round) || leagueDetail.league.inProgressRound;

  await fetchLeagueTeams(initialLeagueId.toString(), currentRound.toString());

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
};

export default HomePage;
