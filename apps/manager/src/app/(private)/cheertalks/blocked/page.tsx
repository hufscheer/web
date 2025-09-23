'use client';

import { Suspense } from '@suspensive/react';
import { Header } from '~/components/layout';

const Page = () => {
  return (
    <>
      <Header title="응원톡 관리" arrow />

      <div className="column h-full gap-1.5 bg-white p-5">
        <Suspense clientOnly>
          <div className="w-auto px-10">d</div>
        </Suspense>
      </div>
    </>
  );
};

export default Page;
