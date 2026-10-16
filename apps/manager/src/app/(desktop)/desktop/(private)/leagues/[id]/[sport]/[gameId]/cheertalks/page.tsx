import { notFound } from 'next/navigation';

import { GameCheerTalks } from '~/app/(desktop)/desktop/(private)/cheertalks/_components/cheer-talks-pages';
import { QueryBoundary } from '~/desktop/components/query-boundary';
import { SPORT_BY_PATH } from '~/desktop/constants/routes';

type Props = {
  params: Promise<{ id: string; sport: string; gameId: string }>;
};

const GameCheerTalksPage = async ({ params }: Props) => {
  const { id, sport, gameId: rawGameId } = await params;
  const leagueId = Number(id);
  const gameId = Number(rawGameId);
  const sportType = SPORT_BY_PATH[sport];
  if (!Number.isInteger(leagueId) || !Number.isInteger(gameId) || !sportType) notFound();

  return (
    <QueryBoundary>
      <GameCheerTalks leagueId={leagueId} gameId={gameId} sportType={sportType} />
    </QueryBoundary>
  );
};

export default GameCheerTalksPage;
