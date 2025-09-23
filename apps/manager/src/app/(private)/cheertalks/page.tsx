import { Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { CheertalkOverview } from './_components/cheertalk-overview';

const BlockedTalkMenu = () => (
  <Typography color="var(--color-neutral-500)" weight="semibold" asChild>
    <Link href={`/${routes.cheertalk_block}`}>가려진 목록</Link>
  </Typography>
);

const Page = () => {
  return (
    <>
      <Header title="응원톡 관리" menu={<BlockedTalkMenu />} arrow />

      <div className="column h-full gap-1.5 bg-white">
        <Suspense clientOnly>
          <CheertalkOverview />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
