import Layout from '@/components/Layout';

import { GameDetail } from './_components';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string; cheer?: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab: tabState, cheer } = await searchParams;
  const cheerState: boolean = cheer === 'open';

  return (
    <Layout>
      <GameDetail
        id={id}
        tabState={tabState || 'lineup'}
        cheerState={cheerState}
      />
    </Layout>
  );
}
