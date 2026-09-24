import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';
import { SPORT_BY_PATH } from '~/constants/routes';

import { GameEdit } from './_components/game-edit';

type Props = { params: Promise<{ id: string; sport: string; gameId: string }> };

const GameEditPage = async ({ params }: Props) => {
  const { id, sport, gameId: rawGameId } = await params;
  const leagueId = Number(id);
  const gameId = Number(rawGameId);
  const sportType = SPORT_BY_PATH[sport];
  if (!Number.isFinite(leagueId) || !Number.isFinite(gameId) || !sportType) notFound();

  return (
    <QueryBoundary>
      <GameEdit leagueId={leagueId} gameId={gameId} sportType={sportType} />
    </QueryBoundary>
  );
};

export default GameEditPage;
