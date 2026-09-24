import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';

import { LeagueManage } from './_components/league-manage';

type Props = { params: Promise<{ id: string }> };

const LeagueManagePage = async ({ params }: Props) => {
  const { id } = await params;
  const leagueId = Number(id);
  if (!Number.isFinite(leagueId)) notFound();

  return (
    <QueryBoundary>
      <LeagueManage leagueId={leagueId} />
    </QueryBoundary>
  );
};

export default LeagueManagePage;
