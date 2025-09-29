import { colors, Typography } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '~/components/layout';
import { routes } from '~/constants/routes';
import { GameList, GameListError } from './_components/game-list';
import { LeagueOverview, LeagueOverviewError } from './_components/league-overview';

const CreateGameMenu = ({ id }: { id: number }) => (
  <Typography color={colors.neutral500} weight="semibold" asChild>
    <Link href={`/${routes.game_create(id)}`}>경기 생성</Link>
  </Typography>
);

type Props = {
  params: Promise<{ id: number }>;
};

const Page = async ({ params }: Props) => {
  const { id: _id } = await params;

  if (!_id || Number.isNaN(Number(_id))) notFound();
  const id: number = Number(_id);

  return (
    <>
      <Header title="대회 내 경기 관리" menu={<CreateGameMenu id={id} />} arrow />

      <div className="column h-full overflow-y-auto">
        <ErrorBoundary fallback={<LeagueOverviewError />}>
          <Suspense fallback={null} clientOnly>
            <LeagueOverview id={id} />
          </Suspense>
        </ErrorBoundary>

        <hr className="h-0.5 w-full shrink-0 border-none bg-neutral-50" />

        <ErrorBoundary fallback={<GameListError />}>
          <Suspense fallback={null} clientOnly>
            <GameList id={id} state="PLAYING" />
          </Suspense>
        </ErrorBoundary>

        <hr className="h-0.5 w-full shrink-0 border-none bg-neutral-50" />

        <ErrorBoundary fallback={<GameListError />}>
          <Suspense fallback={null} clientOnly>
            <GameList id={id} state="SCHEDULED" />
          </Suspense>
        </ErrorBoundary>

        <hr className="h-0.5 w-full shrink-0 border-none bg-neutral-50" />

        <ErrorBoundary fallback={<GameListError />}>
          <Suspense fallback={null} clientOnly>
            <GameList id={id} state="FINISHED" />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Page;
