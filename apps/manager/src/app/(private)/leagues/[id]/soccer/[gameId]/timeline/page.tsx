import { ErrorBoundary, Suspense } from '@suspensive/react';
import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';

import { TimelineDeleteMenu } from '../../../_components/timeline-tab/timeline-delete';
import { TimelineDeleteProvider } from '../../../_components/timeline-tab/timeline-delete-context';
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
    <TimelineDeleteProvider>
      <div className="flex min-h-[100dvh] flex-col bg-white">
        <Header
          title="경기 진행"
          menu={
            <ErrorBoundary fallback={<div>오류</div>}>
              <Suspense clientOnly>
                <TimelineDeleteMenu />
              </Suspense>
            </ErrorBoundary>
          }
          arrow
        />
        <div className="flex-1 overflow-y-auto">
          <ErrorBoundary fallback={<div>오류</div>}>
            <Suspense clientOnly>
              <TimelineClient key={gameId} leagueId={leagueId} gameId={gameId} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </TimelineDeleteProvider>
  );
};

export default Page;
