import Divider from '@/components/Divider';
import Layout from '@/components/Layout';

import LeagueOverview from './_components/LeagueOverview';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  return (
    <Layout navigationTitle="대회 내 경기 관리" navigationMenu="경기 생성">
      <LeagueOverview leagueId={leagueId} />

      <Divider height={11} />
    </Layout>
  );
}
