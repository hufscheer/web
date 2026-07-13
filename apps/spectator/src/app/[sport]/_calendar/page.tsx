import { Suspense } from '@suspensive/react';

import { Header } from '~/components/layout';

import { CalendarOverview } from './_components/CalendarOverview';

const Page = () => {
  return (
    <>
      <Header.Root left={<Header.Arrow />} center={<Header.LinkLogo />} />
      <div className="column-between w-full">
        <Suspense clientOnly>
          <CalendarOverview />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
