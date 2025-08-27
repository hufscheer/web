import { Typography } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { BottomMenu } from './_components/bottom-menu';
import { MatchOverview } from './_components/match-overview';

const LeagueMenu = () => (
  <Typography color="var(--color-primary-600)" weight="semibold" asChild>
    <Link href={`/${routes.league}`}>대회 관리</Link>
  </Typography>
);

const Page = () => {
  return (
    <>
      <Header menu={<LeagueMenu />} />

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
