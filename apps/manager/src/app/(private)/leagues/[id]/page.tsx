import { colors, Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { GameList } from './_components/game-list';
import { LeagueOverview } from './_components/league-overview';

const CreateGameMenu = () => (
  <Typography color={colors.neutral500} weight="semibold" asChild>
    <Link href={`/${routes.games_create}`}>경기 생성</Link>
  </Typography>
);

type Props = {
  params: Promise<{ id: number }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;

  if (!_id || Number.isNaN(_id)) notFound();
  const id: number = Number(_id);

  return (
    <>
      <Header title="대회 내 경기 관리" menu={<CreateGameMenu />} arrow />

      <div className="column h-full overflow-y-auto">
        <Suspense fallback={null} clientOnly>
          <LeagueOverview id={id} />
        </Suspense>

        <hr className="h-2 w-full border-none bg-neutral-50" />

        <Suspense fallback={null} clientOnly>
          <GameList id={id} state="PLAYING" />
        </Suspense>

        <hr className="h-2 w-full border-none bg-neutral-50" />

        <Suspense fallback={null} clientOnly>
          <GameList id={id} state="SCHEDULED" />
        </Suspense>

        <hr className="h-2 w-full border-none bg-neutral-50" />

        <Suspense fallback={null} clientOnly>
          <GameList id={id} state="FINISHED" />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
