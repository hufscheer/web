import { Suspense } from '@suspensive/react';
import { notFound } from 'next/navigation';
import { Header } from '~/components/layout';
import { FormSection } from './form-section';

type Props = {
  params: Promise<{ id: string; gameId: string }>;
};

const Page = async ({ params }: Props) => {
  const { id: _leagueId, gameId: _gameId } = await params;

  const leagueId = Number(_leagueId);
  const gameId = Number(_gameId);

  if (Number.isNaN(leagueId) || Number.isNaN(gameId)) notFound();

  return (
    <>
      <Header title="경기 수정" arrow />

      <div className="column-between h-full overflow-hidden">
        <Suspense clientOnly>
          <FormSection leagueId={leagueId} gameId={gameId} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
