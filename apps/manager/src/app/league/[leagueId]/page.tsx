import Link from 'next/link';

import Divider from '@/components/Divider';
import Layout from '@/components/Layout';

import GameCard from './_components/GameCard';
import LeagueOverview from './_components/LeagueOverview';

type PageProps = {
  params: Promise<{ leagueId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { leagueId } = await params;

  return (
    <Layout
      navigationTitle="대회 내 경기 관리"
      navigationMenu={<Link href={`/league/${leagueId}/register-game`}>경기 생성</Link>}
    >
      <LeagueOverview leagueId={leagueId} />

      <Divider height={11} />

      <GameCard leagueId={leagueId} state="PLAYING" />

      <Divider height={2} />
      <GameCard leagueId={leagueId} state="SCHEDULED" />

      <Divider height={2} />
      <GameCard leagueId={leagueId} state="FINISHED" />
    </Layout>
  );
}
