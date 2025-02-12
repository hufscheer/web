import Component from './component';

type PageProps = {
  params: Promise<{ leagueId: string; teamId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { leagueId, teamId } = await params;

  return <Component leagueId={leagueId} teamId={teamId} />;
}
