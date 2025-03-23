import Layout from '@/components/Layout';

import { GameDetail } from './_components';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string; cheer?: string }>;
};

const GamePage = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const { tab: tabState, cheer } = await searchParams;
  const cheerState: boolean = cheer === 'open';

  return (
    <Layout>
      <GameDetail id={id} tabState={tabState || 'participate'} cheerState={cheerState} />
    </Layout>
  );
};

export default GamePage;
