import { colors, Spinner, Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { CheerTalkTabs } from './_components/cheertalk-tab';

const BlockedTalkMenu = () => (
  <Typography color={colors.neutral500} weight="semibold" asChild>
    <Link href={`/${routes.cheertalk_block}`}>가려진 목록</Link>
  </Typography>
);

const Page = () => {
  return (
    <>
      <Header title="응원톡 관리" menu={<BlockedTalkMenu />} arrow />

      <div className="column h-full gap-2 overflow-hidden bg-white px-5 py-4">
        <Suspense
          fallback={
            <div className="center p-5">
              <Spinner size="lg" color="neutral" />
            </div>
          }
          clientOnly
        >
          <CheerTalkTabs />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
