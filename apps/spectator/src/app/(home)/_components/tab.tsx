'use client';

import { colors, Typography } from '@hcc/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { useSuspenseGames } from '~/api';
import { GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';

export const RecentTab = () => {
  const { data: scheduled } = useSuspenseGames({ state: 'SCHEDULED', size: 20 });
  const { data: playing } = useSuspenseGames({ state: 'PLAYING', size: 20 });

  const router = useRouter();

  return (
    <div>
      <div className="flex flex-1 flex-col gap-3">
        {playing.map((league) => (
          <GameCard key={league.leagueId}>
            <GameCard.League league={league} />
            <GameCard.Divider />

            {league.games.map((game, index) => {
              if (game.gameTeams.length < 2) return null;

              return (
                <Fragment key={game.id}>
                  <GameCard.Container className="gap-4">
                    <GameCard.Header game={game} />

                    <div className="flex gap-4">
                      <Link href={`/${routes.game(game.id)}`} className="column flex-1 gap-2">
                        <GameCard.Team team={game.gameTeams[0]} />
                        <GameCard.Team team={game.gameTeams[1]} />
                      </Link>

                      <div role="separator" className="w-px bg-gray-100" />

                      <GameCard.Actions
                        onBroadcastClick={() => router.push(`/${routes.game(game.id)}`)}
                        onCheerClick={() => router.push(`/${routes.game(game.id)}?cheer=1`)}
                      />
                    </div>
                  </GameCard.Container>
                  {index !== league.games.length - 1 && <GameCard.Divider />}
                </Fragment>
              );
            })}
          </GameCard>
        ))}
        {scheduled.map((league) => (
          <GameCard key={league.leagueId}>
            <GameCard.League league={league} />
            <GameCard.Divider />

            {league.games.map((game, index) => {
              if (game.gameTeams.length < 2) return null;

              return (
                <Fragment key={game.id}>
                  <GameCard.Container className="gap-4">
                    <GameCard.Header game={game} />

                    <div className="relative flex w-full flex-1 gap-4">
                      <Link href={`/${routes.game(game.id)}`} className="column flex-1 gap-2">
                        <GameCard.Team team={game.gameTeams[0]} />
                        <GameCard.Team team={game.gameTeams[1]} />
                      </Link>

                      <div role="separator" className="w-px bg-gray-100" />

                      <GameCard.Actions
                        onBroadcastClick={() => router.push(`/${routes.game(game.id)}`)}
                      />
                    </div>
                  </GameCard.Container>
                  {index !== league.games.length - 1 && <GameCard.Divider />}
                </Fragment>
              );
            })}
          </GameCard>
        ))}
      </div>

      {/* Fallback */}
      {scheduled.length === 0 && playing.length === 0 && (
        <Typography
          className="p-5 text-center"
          color={colors.neutral500}
          fontSize={14}
          weight="medium"
        >
          진행 중인 경기가 없어요 💨
        </Typography>
      )}
    </div>
  );
};
