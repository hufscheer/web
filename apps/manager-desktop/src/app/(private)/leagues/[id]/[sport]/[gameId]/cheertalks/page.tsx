import { notFound } from 'next/navigation';

import { GameCheerTalks } from '~/app/(private)/cheertalks/_components/cheer-talks-pages';
import { QueryBoundary } from '~/components/query-boundary';
import { SPORT_BY_PATH } from '~/constants/routes';

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
