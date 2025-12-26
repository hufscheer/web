import { Header } from '~/components/layout';
import { CalendarOverview } from './_components/CalendarOverview';
import { Suspense } from '@suspensive/react';

const Page = () => {
  return (
    <>
      <Header arrow />
      <div className="column-between w-full">
        <Suspense clientOnly>
          <CalendarOverview />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
