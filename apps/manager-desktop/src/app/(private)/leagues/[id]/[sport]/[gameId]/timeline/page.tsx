import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';
import { SPORT_BY_PATH } from '~/constants/routes';

import { GameConsole } from './_components/game-console';

type Props = {
  params: Promise<{ id: string; sport: string; gameId: string }>;
};

const Page = async ({ params }: Props) => {
  const { sport, gameId: rawGameId } = await params;
  const gameId = Number(rawGameId);
  const sportType = SPORT_BY_PATH[sport];
  if (Number.isNaN(gameId) || !sportType) notFound();

  return (
    <QueryBoundary>
      <GameConsole key={gameId} gameId={gameId} sportType={sportType} />
    </QueryBoundary>
  );
};

export default Page;
