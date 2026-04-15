'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useSuspenseTeamGames, useSuspenseTeam } from '~/api';
import { GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';

import { TeamCard } from './team-card';
import { TeamTrophy } from './trophy';

export const TeamInfo = ({ id }: { id: number }) => {
  const router = useRouter();

  const { data: team } = useSuspenseTeam({ id });
  const { data: games } = useSuspenseTeamGames({ id });

  if (!team) return null;

  return (
    <div className="w-full">
      <div className="my-3 gap-3 px-5">
        <TeamCard>
          <TeamCard.Header team={team} />
          <TeamCard.Divider />
          <TeamTrophy trophies={team.trophies} />
          <TeamCard.Content>
            {games.map((game) => {
              const { gameId, state } = game;
              const gameWithId = { ...game, id, gameState: state };
              const link = routes.game({ id: gameId, sport: team.sportType });

              return (
                <GameCard key={gameId} game={gameWithId}>
                  <GameCard.Container className="gap-4">
                    <GameCard.Header showLeagueName />

                    <div className="flex gap-4">
                      <Link href={link} className="column flex-1 gap-2">
                        <GameCard.Team index={1} />
                        <GameCard.Team index={2} />
                      </Link>

                      <div role="separator" className="w-px bg-gray-100" />

                      <GameCard.Actions
                        onStatsClick={state === 'FINISHED' ? () => router.push(link) : undefined}
                        onBroadcastClick={
                          state !== 'FINISHED' ? () => router.push(link) : undefined
                        }
                        onCheerClick={
                          state !== 'FINISHED' ? () => router.push(`${link}?cheer=1`) : undefined
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
    </div>
  );
};
