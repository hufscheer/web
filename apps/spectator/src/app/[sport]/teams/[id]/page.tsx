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
    <div className="flex min-h-svh flex-col">
      <Header arrow />
      <div className="flex flex-1 flex-col">
        <Suspense clientOnly>
          <TeamInfo id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
