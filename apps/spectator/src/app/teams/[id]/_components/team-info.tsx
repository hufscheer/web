'use client';
import { SmsIcon } from '@hcc/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useSuspenseTeamGames, useSuspenseTeam } from '~/api';
import { EmptyState, GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';

import { TeamCard } from './team-card';
import { TeamTrophy } from './trophy';

export const TeamInfo = ({ id }: { id: number }) => {
  const router = useRouter();

  const { data: team } = useSuspenseTeam({ id });
  const { data: games } = useSuspenseTeamGames({ id });

  if (!team) return null;

  return (
    <div className="my-3 flex flex-1 flex-col px-5">
      <TeamCard className="flex flex-1 flex-col">
        <TeamCard.Header team={team} />
        <TeamCard.Divider />
        <TeamTrophy trophies={team.trophies} />
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
            const gameWithId = { ...game, id, gameState: state };

            return (
              <GameCard key={gameId} game={gameWithId}>
                <GameCard.Container className="gap-4">
                  <GameCard.Header showLeagueName />

                  <div className="flex gap-4">
                    <Link href={`/${routes.game(gameId)}`} className="column flex-1 gap-2">
                      <GameCard.Team index={1} />
                      <GameCard.Team index={2} />
                    </Link>

                    <div role="separator" className="w-px bg-gray-100" />

                    <GameCard.Actions
                      onStatsClick={
                        state === 'FINISHED'
                          ? () => router.push(`/${routes.game(gameId)}`)
                          : undefined
                      }
                      onBroadcastClick={
                        state !== 'FINISHED'
                          ? () => router.push(`/${routes.game(gameId)}`)
                          : undefined
                      }
                      onCheerClick={
                        state !== 'FINISHED'
                          ? () => router.push(`/${routes.game(gameId)}?cheer=1`)
                          : undefined
                      }
                    />
                  </div>
                </GameCard.Container>
              </GameCard>
            );
          })}
        </TeamCard.Content>
      </TeamCard>
    </div>
  );
};
