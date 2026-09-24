import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';

import { LeagueDetail } from './_components/league-detail';

type Props = {
  params: Promise<{ id: string }>;
};

const LeagueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const leagueId = Number(id);
  if (!Number.isFinite(leagueId)) notFound();

  return (
    <QueryBoundary>
      <LeagueDetail leagueId={leagueId} />
    </QueryBoundary>
  );
};

export default LeagueDetailPage;
