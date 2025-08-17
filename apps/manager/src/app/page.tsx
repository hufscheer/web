import { Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { ROUTES } from '~/constants/routes';
import { BottomMenu } from './_components/bottom-menu';
import { MatchOverview } from './_components/match-overview';

const LeagueMenu = () => (
  <Typography color="var(--color-primary-600)" weight="semibold" asChild>
    <Link href={ROUTES.LEAGUE}>대회 관리</Link>
  </Typography>
);

const Page = () => {
  return (
    <>
      <Header menu={<LeagueMenu />} />

      <div className="column-between mt-1.5 h-full gap-1.5">
        <Suspense fallback={<div />} clientOnly>
          <MatchOverview />
        </Suspense>

        <BottomMenu />
      </div>
    </>
  );
};

export default Page;
