import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';

import { BlockedList } from './blocked-list';

type Props = {
  params: Promise<{ id: number; gameId: number }>;
};

const Page = async ({ params }: Props) => {
  const { gameId: _gameId } = await params;

  if (!_gameId || Number.isNaN(Number(_gameId))) notFound();
  const gameId = Number(_gameId);

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
          <BlockedList gameId={gameId} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
