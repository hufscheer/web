import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';

import { GameCheerTalkTabs } from './_components/cheertalk-tabs';

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

      <div className="column h-full gap-2 overflow-hidden bg-white px-5 py-4">
        <GameCheerTalkTabs gameId={gameId} />
      </div>
    </>
  );
};

export default Page;
