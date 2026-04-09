import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';

import { LeagueCheerTalkTabs } from './_components/cheertalk-tabs';

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

      <div className="column h-full gap-2 overflow-hidden bg-white px-5 py-4">
        <LeagueCheerTalkTabs leagueId={id} />
      </div>
    </>
  );
};

export default Page;
