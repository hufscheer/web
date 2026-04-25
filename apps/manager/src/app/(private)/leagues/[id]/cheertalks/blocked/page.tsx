import { Spinner } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';

import { BlockedList } from './blocked-list';

type Props = {
  params: Promise<{ id: number }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;

  if (!_id || Number.isNaN(Number(_id))) notFound();
  const id = Number(_id);

  return (
    <>
      <Header title="응원톡 관리" arrow />

      <div className="column h-full gap-1.5 overflow-y-auto bg-white px-5 py-4">
        <Suspense
          fallback={
            <div className="center p-5">
              <Spinner size="lg" color="neutral" />
            </div>
          }
          clientOnly
        >
          <BlockedList leagueId={id} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
