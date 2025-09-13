import { dehydrate, getQueryClient, HydrationBoundary } from '@hcc/api-base';
import { redirect } from 'next/navigation';
import { fetchLeague, type LeagueDetailType } from '~/api';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';

type Props = {
  searchParams: Promise<{ round: number }>;
  params: Promise<{ id: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const qc = getQueryClient();

  const { id: _id } = await params;
  const id = Number(_id);

  const { round: _round } = await searchParams;
  const league: LeagueDetailType = await fetchLeague({ leagueId: id });
  const round = Number(_round) || league.league.inProgressRound;

  if (!_id || Number.isNaN(id) || id <= 0) {
    redirect(`/${routes.home}`);
  }

  alert(round);

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Header arrow />
      <div className="h-full w-full">{id}</div>
    </HydrationBoundary>
  );
};

export default Page;
