import Component from './component';

type PageProps = {
  params: Promise<{ leagueId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { leagueId } = await params;

  return <Component leagueId={leagueId} />;
}
