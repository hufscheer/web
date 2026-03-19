'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Button, Typography } from '@hcc/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import type { GameListType } from '~/api';

import { useSuspenseGames } from '~/api';
import { GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';

export const RecentTab = () => {
  const { data: scheduled } = useSuspenseGames({ state: 'SCHEDULED', size: 20 });
  const { data: playing } = useSuspenseGames({ state: 'PLAYING', size: 20 });

  return (
    <>
      <div className="flex flex-1 flex-col gap-3">
        {playing.map((league, index) => {
          return (
            <GameList
              key={league.leagueId}
              leagueId={league.leagueId}
              leagueName={league.leagueName}
              games={league.games}
              trailing={
                index === 0 && (
                  <Button size="sm" color="primary">
                    지금 같이 응원하기
                  </Button>
                )
              }
            />
          );
        })}

        {scheduled.map((league, index) => {
          return (
            <GameList
              key={league.leagueId}
              leagueId={league.leagueId}
              leagueName={league.leagueName}
              games={league.games}
              trailing={
                index === 0 && (
                  <Button variant="ghost" size="sm" color="primary" className="gap">
                    지금 같이 응원하기
                    <ChevronForwardIcon className="animate-[arrow_1s_ease-in-out_infinite] " />
                  </Button>
                )
              }
            />
          );
        })}
      </div>
    </>
  );
};

interface GameListProps {
  leagueId: number;
  leagueName: string;
  games: GameListType[];
  trailing?: React.ReactNode;
}

const GameList = ({ leagueId, leagueName, games, trailing }: GameListProps) => {
  const router = useRouter();

  return (
    <>
      <GameCard.Divider />
      <Link href={`/${routes.league(leagueId)}`} className="row-between">
        <div className="center-y gap-3">
          <div className="center relative h-8 w-8 overflow-hidden rounded-full bg-neutral-200 select-none">
            ⚽
          </div>
          <Typography weight="medium">{leagueName}</Typography>
        </div>

        <ChevronForwardIcon size={24} />
      </Link>
      <GameCard.Divider />

      {games.map((game, index) => {
        if (game.gameTeams.length < 2) return null;

        return (
          <Fragment key={game.id}>
            <GameCard game={game}>
              <GameCard.Container className="gap-4">
                <GameCard.Header />

                <div className="flex gap-4">
                  <Link href={`/${routes.game(game.id)}`} className="column flex-1 gap-2">
                    <GameCard.Team index={1} />
                    <GameCard.Team index={2} />
                  </Link>

                  <div role="separator" className="w-px bg-gray-100" />

                  <GameCard.Actions
                    onBroadcastClick={() => router.push(`/${routes.game(game.id)}`)}
                    onCheerClick={() => router.push(`/${routes.game(game.id)}?cheer=1`)}
                  />
                </div>
              </GameCard.Container>
            </GameCard>
            {index !== games.length - 1 && <GameCard.Divider />}
            {trailing}
          </Fragment>
        );
      })}
    </>
  );
};
