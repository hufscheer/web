import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/app/(desktop)/_components/query-boundary';
import { SPORT_BY_PATH } from '~/app/(desktop)/_constants/routes';
import { parseCheerTalkFilter } from '~/app/(desktop)/_utils/cheer-talk-filter';
import { GameCheerTalks } from '~/app/(desktop)/desktop/(private)/cheertalks/_components/cheer-talks-pages';

type Props = {
  params: Promise<{ id: string; sport: string; gameId: string }>;
  searchParams: Promise<{ filter?: string | string[] }>;
};

const GameCheerTalksPage = async ({ params, searchParams }: Props) => {
  const { id, sport, gameId: rawGameId } = await params;
  const { filter } = await searchParams;
  const leagueId = Number(id);
  const gameId = Number(rawGameId);
  const sportType = SPORT_BY_PATH[sport];
  if (!Number.isInteger(leagueId) || !Number.isInteger(gameId) || !sportType) notFound();

  return (
    <QueryBoundary>
      <GameCheerTalks
        leagueId={leagueId}
        gameId={gameId}
        sportType={sportType}
        initialFilter={parseCheerTalkFilter(filter)}
      />
    </QueryBoundary>
  );
};

export default GameCheerTalksPage;
