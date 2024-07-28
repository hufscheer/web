import Layout from '@/components/Layout';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;

  return <Layout navigationTitle="대회 정보 수정">{leagueId}</Layout>;
}
