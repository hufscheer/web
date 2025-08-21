import { Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { LeagueOverview } from './_components/league-overview';

const LeagueCreateMenu = () => (
  <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
    <Link href={`/${routes.league}`}>대회 생성</Link>
  </Typography>
);

const Page = () => {
  return (
    <>
      <Header title="대회 관리" menu={<LeagueCreateMenu />} arrow />

      <div className="column mt-1.5 h-full gap-1.5">
        <Suspense clientOnly>
          <LeagueOverview />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
