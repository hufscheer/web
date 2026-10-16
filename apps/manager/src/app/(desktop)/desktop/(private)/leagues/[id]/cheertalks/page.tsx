import { notFound } from 'next/navigation';

import { LeagueCheerTalks } from '~/app/(desktop)/desktop/(private)/cheertalks/_components/cheer-talks-pages';
import { QueryBoundary } from '~/desktop/components/query-boundary';

type Props = {
  params: Promise<{ id: string }>;
};

const LeagueCheerTalksPage = async ({ params }: Props) => {
  const { id } = await params;
  const leagueId = Number(id);
  if (!Number.isInteger(leagueId)) notFound();

  return (
    <QueryBoundary>
      <LeagueCheerTalks leagueId={leagueId} />
    </QueryBoundary>
  );
};

export default LeagueCheerTalksPage;
