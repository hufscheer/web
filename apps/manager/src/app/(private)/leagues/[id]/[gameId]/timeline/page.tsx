import { ErrorBoundary, Suspense } from '@suspensive/react';
import { notFound } from 'next/navigation';
import { Header } from '~/components/layout';
import { TimelineDeleteMenu } from '../../_components/timeline-tab/timeline-delete';
import TimelineClient from './timelineClient';

type Props = {
  params: Promise<{ id: string; gameId: string }>;
};

const Page = async ({ params }: Props) => {
  const { id: _leagueId, gameId: _gameId } = await params;

  const leagueId = Number(_leagueId);
  const gameId = Number(_gameId);

  if (Number.isNaN(leagueId) || Number.isNaN(gameId)) notFound();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <Header
        title="경기 진행"
        menu={
          <ErrorBoundary fallback={<div>오류</div>}>
            <Suspense clientOnly>
              <TimelineDeleteMenu gameId={gameId} />
            </Suspense>
          </ErrorBoundary>
        }
        arrow
      />
      <div className="flex-1 overflow-y-auto">
        <ErrorBoundary fallback={<div>오류</div>}>
          <Suspense clientOnly>
            <TimelineClient key={gameId} gameId={gameId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
