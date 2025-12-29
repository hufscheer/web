'use client';
import { useSuspenseTeamGames, useSuspenseTeam } from '~/api';
import { TeamCard } from './team-card';
import { GameCard } from '~/components/ui/game-card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { routes } from '~/constants/routes';

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
          <TeamCard.Content>
            {games.map(game => {
              const { gameId, gameTeams, state } = game;
              const [homeTeam, awayTeam] = gameTeams;
              const gameWithId = { ...game, id: gameId };
              return (
                <GameCard key={gameId}>
                  <GameCard.Container>
                    <TeamCard.GameHeader game={gameWithId} />
                    <Link href={`/${routes.game(gameId)}`} className="row-between pt-2">
                      {homeTeam && <GameCard.Team team={homeTeam} position="home" />}
                      <GameCard.Score game={gameWithId} />
                      {awayTeam && <GameCard.Team team={awayTeam} position="away" />}
                    </Link>

                    {state === 'FINISHED' ? (
                      <TeamCard.Actions
                        onStatsClick={() => router.push(`/${routes.game(gameId)}`)}
                      />
                    ) : (
                      <GameCard.Actions
                        onBroadcastClick={() => router.push(`/${routes.game(gameId)}`)}
                        onCheerClick={() => router.push(`/${routes.game(gameId)}?cheer=1`)}
                      />
                    )}
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
