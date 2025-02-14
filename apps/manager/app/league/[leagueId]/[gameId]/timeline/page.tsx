import { Suspense } from 'react';

import Component from './component';

type PageProps = {
  params: Promise<{ gameId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { gameId } = await params;

  return (
    <Suspense>
      <Component gameId={gameId} />
    </Suspense>
  );
}
