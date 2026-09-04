import type { Metadata } from 'next';

import { dehydrate, getQueryClient, HydrationBoundary } from '@hcc/api-base';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import type { LeagueDetailType, LeagueTeamType } from '~/api';

import { fetchLeague, fetchLeagueTeams } from '~/api';
import { BracketSheet } from '~/components/brackets/bracket-sheet';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';

import { SPORT_TYPE } from '../../_constants';
import { GameList } from '../_components/game-list';
import { RoundFilter } from '../_components/round-filter';
import { TeamFilter } from '../_components/team-filter';

type Props = {
  searchParams: Promise<{ round: number; teams: string }>;
  params: Promise<{ orgId: string; id: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const qc = getQueryClient();

  const { orgId: _orgId, id: _id } = await params;
  const orgId = Number(_orgId);
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) {
    redirect(routes.home({ orgId, sport: SPORT_TYPE }));
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
      <Header.Root
        left={<Header.Arrow />}
        center={<Header.LinkLogo sport={SPORT_TYPE} orgId={orgId} />}
        right={
          league.bracketEnabled === true ? <BracketSheet leagueName={league.name} /> : undefined
        }
      />
      {league && round && <RoundFilter league={league} round={round} />}
      {teams && <TeamFilter teams={teams} selectedTeams={selectedTeams} />}
      <Suspense clientOnly>
        <GameList
          leagueId={id}
          round={round}
          selectedTeams={selectedTeams}
          sportType={SPORT_TYPE}
        />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { orgId: _orgId, id: _id } = await params;
  const orgId = Number(_orgId);
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) return {};

  const league: LeagueDetailType = await fetchLeague({ leagueId: id });
  const title = league ? league.name : '';
  const url = routes.league({ orgId, id, sport: SPORT_TYPE });

  return {
    title,
    openGraph: { title, url },
    twitter: { title },
  };
};
