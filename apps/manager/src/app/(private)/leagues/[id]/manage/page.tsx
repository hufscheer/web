import { notFound } from 'next/navigation';

import { Header } from '~/components/layout';

import { LeagueEditContainer } from './_components/form-section';
import { LeagueDeleteMenu } from './_components/league-delete';

type Props = {
  params: Promise<{ id: number }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;

  if (!_id || Number.isNaN(Number(_id))) notFound();
  const id = Number(_id);

  return (
    <>
      <Header title="대회 정보 수정" arrow menu={<LeagueDeleteMenu leagueId={id} />} />
      <LeagueEditContainer leagueId={id} />
      {/* <div className="column h-full overflow-y-auto">{id}</div> */}
    </>
  );
};

export default Page;
