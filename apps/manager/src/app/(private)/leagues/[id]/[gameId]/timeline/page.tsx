import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '~/components/layout';
import TimelineClient from './timelineClient';

type PageProps = { params: { id: string; gameId: string } };

const TimelineDeleteMenu = () => (
  <Typography color="var(--color-danger-600)" weight="semibold" asChild>
    <Link href="#">타임라인 삭제</Link>
  </Typography>
);

export default function Page({ params: { id, gameId } }: PageProps) {
  const leagueId = Number(id);
  const gid = Number(gameId);

  if (Number.isNaN(leagueId) || Number.isNaN(gid)) notFound();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <Header title="경기 진행" menu={<TimelineDeleteMenu />} arrow />
      <div className="flex-1 overflow-y-auto">
        <TimelineClient key={gid} gameId={gid} />
      </div>
    </div>
  );
}
