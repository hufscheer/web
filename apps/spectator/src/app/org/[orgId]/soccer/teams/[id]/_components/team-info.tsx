'use client';
import { SmsIcon } from '@hcc/icons';
import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { SportType } from '~/api';

import { useSuspenseTeamGames, useTeamWithSummaryPlaceholder } from '~/api';
import { Skeleton } from '~/components/skeleton';
import { EmptyState, GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';
import { useOrganizationId } from '~/hooks/useOrganizationId';

import { TeamCard } from './team-card';
import { TeamTrophy } from './trophy';

export const TeamInfo = ({ id }: { id: number }) => {
  const { data: team } = useTeamWithSummaryPlaceholder({ id });

  if (!team) return <TeamInfoSkeleton />;

  return (
    <div className="my-3 flex flex-1 flex-col px-5">
      <TeamCard className="flex flex-1 flex-col">
        <TeamCard.Header team={team} />
        <TeamCard.Divider />
        <TeamTrophy trophies={team.trophies} />
        <Suspense clientOnly fallback={<TeamGamesSkeleton />}>
          <TeamGames id={id} sportType={team.sportType} />
        </Suspense>
      </TeamCard>
    </div>
  );
};

const TeamGames = ({ id, sportType }: { id: number; sportType: SportType }) => {
  const router = useRouter();
  const { organizationId } = useOrganizationId();
  const { data: games } = useSuspenseTeamGames({ id });

  return (
    <TeamCard.Content className={games.length === 0 ? 'flex-1' : undefined}>
      {games.length === 0 && (
        <EmptyState
          icon={<SmsIcon color="var(--color-greyscale-300)" size={30} />}
          title="아직 경기 기록이 없어요"
          description="첫 경기가 시작되면 여기에 바로 업데이트 돼요"
        />
      )}
      {games.map((game) => {
        const { gameId, state } = game;
        const gameWithId = { ...game, id };
        const pathname = routes.game({
          orgId: organizationId,
          id: gameId,
          sport: sportType,
        });

        return (
          <GameCard key={gameId} game={gameWithId}>
            <GameCard.Container className="gap-4">
              <GameCard.Header showLeagueName />

              <div className="flex gap-4">
                <Link href={pathname} className="column flex-1 gap-2">
                  <GameCard.Team index={1} />
                  <GameCard.Team index={2} />
                </Link>

                <div role="separator" className="w-px bg-gray-100" />

                <GameCard.Actions
                  onStatsClick={state === 'FINISHED' ? () => router.push(pathname) : undefined}
                  onBroadcastClick={state !== 'FINISHED' ? () => router.push(pathname) : undefined}
                  onCheerClick={
                    state !== 'FINISHED' ? () => router.push(`${pathname}?cheer=1`) : undefined
                  }
                />
              </div>
            </GameCard.Container>
          </GameCard>
        );
      })}
    </TeamCard.Content>
  );
};

/* ----- skeleton ----- */

const TeamGamesSkeleton = () => (
  <div className="flex flex-col gap-5">
    <Skeleton className="h-28 rounded-lg" />
    <Skeleton className="h-28 rounded-lg" />
  </div>
);

export const TeamInfoSkeleton = () => (
  <div className="my-3 flex flex-1 flex-col px-5">
    <TeamCard className="flex flex-1 flex-col">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 shrink-0 rounded-full p-0" />
        <Skeleton className="h-5 w-32" />
      </div>
      <TeamCard.Divider />
      <TeamGamesSkeleton />
    </TeamCard>
  </div>
);
