import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { Header } from '~/components/layout';
import { BlockedList } from './blocked-list';

const Page = () => {
  return (
    <>
      <Header title="응원톡 관리" arrow />

      <div className="column h-full gap-1.5 bg-white px-5 py-4">
        <Suspense
          fallback={
            <div className="center p-5">
              <Spinner size="lg" color="neutral" />
            </div>
          }
          clientOnly
        >
          <BlockedList />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
