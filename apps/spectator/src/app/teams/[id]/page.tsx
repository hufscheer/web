import { Suspense } from '@suspensive/react';

import { Header } from '~/components/layout';

import { TeamInfo } from './_components/team-info';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;
  const id = Number(_id);
  return (
    <>
      <Header arrow />
      <div className="column-between w-full">
        <Suspense clientOnly>
          <TeamInfo id={id} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
