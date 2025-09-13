import { dehydrate, getQueryClient, HydrationBoundary } from '@hcc/api-base';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  fetchLeague,
  fetchLeagueTeams,
  type LeagueDetailType,
  type LeagueTeamType,
  type LeagueType,
} from '~/api';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { RoundFilter } from './_components/round-filter';
import { TeamFilter } from './_components/team-filter';

type Props = {
  searchParams: Promise<{ round: number }>;
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

  const { round: _round } = await searchParams;
  const round = Number(_round) || league.inProgressRound;

  const teams: LeagueTeamType[] = await fetchLeagueTeams({ leagueId: id, round });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Header arrow />
      <div className="h-full w-full">
        {league && round && <RoundFilter league={league} round={round} />}
        {teams && <TeamFilter teams={teams} />}
      </div>
    </HydrationBoundary>
  );
};

export default Page;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id: _id } = await params;
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) return {};

  const league: LeagueType = await fetchLeague({ leagueId: id });
  const title = league ? league.name : '';
  const url = `/${routes.league(id)}`;

  return {
    title,
    openGraph: { title, url },
    twitter: { title },
  };
};
