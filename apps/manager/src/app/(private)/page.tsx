import { ErrorBoundary, Suspense } from '@suspensive/react';
import { Header } from '~/components/layout';
import { BottomMenu } from './_components/bottom-menu';
import { MatchOverview } from './_components/match-overview';

const Page = () => {
  return (
    <>
      <Header />

      <div className="column-between h-full w-full overflow-hidden">
        <ErrorBoundary fallback={<div />}>
          <Suspense fallback={<div />} clientOnly>
            <MatchOverview />
          </Suspense>
        </ErrorBoundary>

        <BottomMenu />
      </div>
    </>
  );
};

export default Page;
