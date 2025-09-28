import { notFound } from 'next/navigation';
import { Header } from '~/components/layout';
import TimelineClient from './timelineClient';
import { TimelineDeleteMenu } from '../../_components/timeline-tab/timeline-delete';

type PageProps = { params: { id: string; gameId: string } };

export default function Page({ params: { id, gameId } }: PageProps) {
  const leagueId = Number(id);
  const gid = Number(gameId);

  if (Number.isNaN(leagueId) || Number.isNaN(gid)) notFound();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <Header title="경기 진행" menu={<TimelineDeleteMenu gameId={gid} />} arrow />
      <div className="flex-1 overflow-y-auto">
        <TimelineClient key={gid} gameId={gid} />
      </div>
    </div>
  );
}
