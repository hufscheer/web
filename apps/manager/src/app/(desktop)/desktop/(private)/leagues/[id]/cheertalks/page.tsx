import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/app/(desktop)/_components/query-boundary';
import { parseCheerTalkFilter } from '~/app/(desktop)/_utils/cheer-talk-filter';
import { LeagueCheerTalks } from '~/app/(desktop)/desktop/(private)/cheertalks/_components/cheer-talks-pages';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ filter?: string | string[] }>;
};

const LeagueCheerTalksPage = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { filter } = await searchParams;
  const leagueId = Number(id);
  if (!Number.isInteger(leagueId)) notFound();

  return (
    <QueryBoundary>
      <LeagueCheerTalks leagueId={leagueId} initialFilter={parseCheerTalkFilter(filter)} />
    </QueryBoundary>
  );
};

export default LeagueCheerTalksPage;
