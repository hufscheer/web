import { dehydrate, getQueryClient, HydrationBoundary } from '@hcc/api-base';
import { Suspense } from '@suspensive/react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { LeagueDetailType, LeagueTeamType } from '~/api';
import { fetchLeague, fetchLeagueTeams } from '~/api';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { GameList } from './_components/game-list';
import { RoundFilter } from './_components/round-filter';
import { TeamFilter } from './_components/team-filter';

type Props = {
  searchParams: Promise<{ round: number; teams: string }>;
  params: Promise<{ id: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const qc = getQueryClient();

  const { id: _id } = await params;
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) {
    redirect(`/${routes.home}`);
  }

  const league: LeagueDetailType = await fetchLeague({ leagueId: id });

  const { round: _round, teams: _teams } = await searchParams;
  // const round = Number(_round) || league.inProgressRound;
  const round = Number(_round) || league.maxRound;
  const teams: LeagueTeamType[] = await fetchLeagueTeams({
    leagueId: id,
    round,
  });
  const selectedTeams = _teams ? _teams.split(',').map(Number).filter(Boolean) : [];

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Header arrow />
      {league && round && <RoundFilter league={league} round={round} />}
      {teams && <TeamFilter teams={teams} selectedTeams={selectedTeams} />}
      <Suspense clientOnly>
        <GameList leagueId={id} round={round} selectedTeams={selectedTeams} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id: _id } = await params;
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) return {};

  const league: LeagueDetailType = await fetchLeague({ leagueId: id });
  const title = league ? league.name : '';
  const url = `/${routes.league(id)}`;

  return {
    title,
    openGraph: { title, url },
    twitter: { title },
  };
};
