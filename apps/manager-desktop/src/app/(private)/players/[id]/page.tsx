import { notFound } from 'next/navigation';

import { QueryBoundary } from '~/components/query-boundary';

import { PlayerDetail } from './_components/player-detail';

type Props = { params: Promise<{ id: string }> };

const PlayerEditPage = async ({ params }: Props) => {
  const { id } = await params;
  const playerId = Number(id);
  if (!Number.isFinite(playerId)) notFound();

  return (
    <QueryBoundary>
      <PlayerDetail playerId={playerId} />
    </QueryBoundary>
  );
};

export default PlayerEditPage;
