import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '~/components/layout';
import TimelineClient from './timelineClient';

type Props = {
  params: Promise<{ id: number }>;
};

const TimelineDeleteMenu = () => (
  <Typography color="var(--color-danger-600)" weight="semibold" asChild>
    <Link href={''}>타임라인 삭제</Link>
  </Typography>
);

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;

  if (!_id || Number.isNaN(Number(_id))) notFound();
  const id: number = Number(_id);

  return (
    <div className="-mx-auto w-screen">
      <div className="flex h-screen flex-col bg-white">
        <Header title="경기 진행" menu={<TimelineDeleteMenu />} arrow />
        <div className="flex-1 overflow-y-auto">
          <TimelineClient gameId={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
