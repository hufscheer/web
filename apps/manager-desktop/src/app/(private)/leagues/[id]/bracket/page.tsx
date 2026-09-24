import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';

import { LeagueBracket } from './_components/league-bracket';

type Props = { params: Promise<{ id: string }> };

const LeagueBracketPage = async ({ params }: Props) => {
  const { id } = await params;
  const leagueId = Number(id);
  if (!Number.isFinite(leagueId)) notFound();

  return (
    <QueryBoundary>
      <LeagueBracket leagueId={leagueId} />
    </QueryBoundary>
  );
};

export default LeagueBracketPage;
