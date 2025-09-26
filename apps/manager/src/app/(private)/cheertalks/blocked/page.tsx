'use client';

import { Suspense } from '@suspensive/react';
import { useSuspenseCheerTalkBlock } from '~/api/queries/useCheerTalkBlock';
import { Header } from '~/components/layout';
import { CheertalkList } from '../_components/cheertalk-list';

const Page = () => {
  const { data } = useSuspenseCheerTalkBlock({ cursor: 1, size: 5 });
  return (
    <>
      <Header title="응원톡 관리" arrow />

      <div className="column h-full gap-1.5 bg-white p-5">
        <Suspense clientOnly>
          <CheertalkList cheerTalks={data} status="blocked" />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
