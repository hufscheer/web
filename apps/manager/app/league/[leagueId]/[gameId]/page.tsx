import { Suspense } from 'react';

import { Component } from './component';

type PageProps = {
  params: Promise<{ leagueId: string; gameId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { leagueId, gameId } = await params;

  return (
    <Suspense>
      <Component leagueId={leagueId} gameId={gameId} />
    </Suspense>
  );
}
