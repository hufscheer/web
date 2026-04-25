import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';

import { BlockedList } from '../../../../_components/game-cheertalk/blocked-list';

type Props = {
  params: Promise<{ id: string; gameId: string }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id, gameId: _gameId } = await params;

  if (!_gameId || Number.isNaN(Number(_gameId))) notFound();
  if (!_id || Number.isNaN(Number(_id))) notFound();
  const gameId = Number(_gameId);
  const leagueId = Number(_id);

  return (
    <>
      <Header title="응원톡 관리" arrow />

      <div className="column h-full gap-1.5 bg-white px-5 py-4">
        <Suspense
          fallback={
            <div className="center p-5">
              <Spinner size="lg" color="neutral" />
            </div>
          }
          clientOnly
        >
          <BlockedList gameId={gameId} leagueId={leagueId} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
