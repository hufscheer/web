import type { Metadata } from 'next';

import { dehydrate, getQueryClient, HydrationBoundary } from '@hcc/api-base';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import type { LeagueDetailType, LeagueTeamType } from '~/api';

import { fetchLeague, fetchLeagueTeams } from '~/api';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

import { GameList } from '../_components/game-list';
import { RoundFilter } from '../_components/round-filter';
import { TeamFilter } from '../_components/team-filter';

type Props = {
  searchParams: Promise<{ round: number; teams: string }>;
  params: Promise<{ id: string; sport: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const qc = getQueryClient();

  const { id: _id, sport: _sport } = await params;
  const id = Number(_id);
  const sportType = normalizeSportParam(_sport);

  if (!_id || Number.isNaN(id) || id <= 0) {
    redirect(routes.home({ sport: DEFAULT_SPORT }));
  }

  if (!sportType) {
    redirect(routes.home({ sport: DEFAULT_SPORT }));
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
      <Header.Root left={<Header.Arrow />} center={<Header.LinkLogo />} />
      {league && round && <RoundFilter league={league} round={round} />}
      {teams && <TeamFilter teams={teams} selectedTeams={selectedTeams} />}
      <Suspense clientOnly>
        <GameList leagueId={id} round={round} selectedTeams={selectedTeams} sportType={sportType} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id: _id, sport: _sport } = await params;
  const id = Number(_id);
  const sportType = normalizeSportParam(_sport);

  if (!_id || Number.isNaN(id) || id <= 0 || !sportType) return {};

  const league: LeagueDetailType = await fetchLeague({ leagueId: id });
  const title = league ? league.name : '';
  const url = routes.league({ id, sport: sportType });

  return {
    title,
    openGraph: { title, url },
    twitter: { title },
  };
};
