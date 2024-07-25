import Link from 'next/link';

import Divider from '@/components/Divider';
import Layout from '@/components/Layout';

import GameCard from './_components/GameCard';
import LeagueOverview from './_components/LeagueOverview';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  return (
    <Layout
      navigationTitle="대회 내 경기 관리"
      navigationMenu={
        <Link href={`/league/${leagueId}/register-game`}>경기 생성</Link>
      }
    >
      <LeagueOverview leagueId={leagueId} />

      <Divider height={11} />

      <GameCard leagueId={leagueId} state="playing" />

      <Divider height={2} />
      <GameCard leagueId={leagueId} state="scheduled" />

      <Divider height={2} />
      <GameCard leagueId={leagueId} state="finished" />
    </Layout>
  );
}
