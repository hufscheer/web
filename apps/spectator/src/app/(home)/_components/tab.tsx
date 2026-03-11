'use client';

import { colors, Spinner, Typography } from '@hcc/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, Suspense } from 'react';

import { useSuspenseGames } from '~/api';
import { GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';

import { BestScorer } from './best-scorer';
import { RankingBoard } from './ranking-board';
import { RecentRecords } from './recent-records';

export const RecentTab = () => {
  const { data: scheduled } = useSuspenseGames({ state: 'SCHEDULED', size: 20 });
  const { data: playing } = useSuspenseGames({ state: 'PLAYING', size: 20 });

  const router = useRouter();

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex flex-1 flex-col gap-3">
        {playing.map((league) => (
          <GameCard key={league.leagueId}>
            <GameCard.League league={league} />
            <GameCard.Divider />

            {league.games.map((game, index) => {
              if (game.gameTeams.length < 2) return null;

              return (
                <Fragment key={game.id}>
                  <GameCard.Container>
                    <GameCard.Header game={game} />

                    <Link href={`/${routes.game(game.id)}`} className="row-between pt-2">
                      <GameCard.Team team={game.gameTeams[0]} position="home" />
                      <GameCard.Score game={game} />
                      <GameCard.Team team={game.gameTeams[1]} position="away" />
                    </Link>

                    <GameCard.Actions
                      onBroadcastClick={() => router.push(`/${routes.game(game.id)}`)}
                      onCheerClick={() => router.push(`/${routes.game(game.id)}?cheer=1`)}
                    />
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
                  <GameCard.Container>
                    <GameCard.Header game={game} />
                    <Link href={`/${routes.game(game.id)}`} className="row-between pt-2">
                      <GameCard.Team team={game.gameTeams[0]} position="home" />
                      <GameCard.Score game={game} />
                      <GameCard.Team team={game.gameTeams[1]} position="away" />
                    </Link>
                    <GameCard.Actions
                      onBroadcastClick={() => router.push(`/${routes.game(game.id)}`)}
                    />
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

      <div className="flex flex-col gap-3">
        <Suspense
          fallback={
            <RankingBoard>
              <Spinner />
            </RankingBoard>
          }
        >
          <RecentRecords />
        </Suspense>

        <Suspense
          fallback={
            <RankingBoard>
              <Spinner />
            </RankingBoard>
          }
        >
          <BestScorer />
        </Suspense>
      </div>
    </div>
  );
};
