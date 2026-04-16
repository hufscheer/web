import type { Metadata } from 'next';

import { dehydrate, getQueryClient, HydrationBoundary } from '@hcc/api-base';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import type { LeagueDetailType, LeagueTeamType } from '~/api';
import type { SportType } from '~/api/types';

import { fetchLeague, fetchLeagueTeams } from '~/api';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';

import { GameList } from '../_components/game-list';
import { RoundFilter } from '../_components/round-filter';
import { TeamFilter } from '../_components/team-filter';

// URL의 lowercase sport를 uppercase로 변환하는 함수
const normalizeSportType = (sport: string): SportType | null => {
  const normalized = sport.toUpperCase();
  if (normalized === 'SOCCER' || normalized === 'BASKETBALL') {
    return normalized as SportType;
  }
  return null;
};

type Props = {
  searchParams: Promise<{ round: number; teams: string }>;
  params: Promise<{ id: string; sport: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const qc = getQueryClient();

  const { id: _id, sport: _sport } = await params;
  const id = Number(_id);
  const sportType = normalizeSportType(_sport);

  if (!_id || Number.isNaN(id) || id <= 0) {
    redirect(routes.home);
  }

  if (!sportType) {
    redirect(routes.home);
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
        <GameList leagueId={id} round={round} selectedTeams={selectedTeams} sportType={sportType} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id: _id, sport: _sport } = await params;
  const id = Number(_id);
  const sportType = normalizeSportType(_sport);

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
