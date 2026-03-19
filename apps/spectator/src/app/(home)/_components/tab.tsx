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
  const { data: playing } = useSuspenseGames({ state: 'PLAYING', size: 20 });
  const { data: finished } = useSuspenseGames({ state: 'FINISHED', size: 9999 });

  const hasPlayingGames = playing.length !== 0;
  const recentFinished = finished.sort((a, b) => a.leagueId - b.leagueId).at(-1);
  const displayedGame = hasPlayingGames ? playing.at(-1) : recentFinished;

  if (!displayedGame) return null;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3">
        <GameList
          leagueId={displayedGame.leagueId}
          leagueName={displayedGame.leagueName}
          games={displayedGame.games}
          trailing={
            <Button variant="ghost" size="sm" color="primary" className="gap">
              {hasPlayingGames ? '응원하러 가기' : '지난 경기 보러가기'}
              <ChevronForwardIcon className="animate-[arrow_1s_ease-in-out_infinite] " />
            </Button>
          }
        />
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
            {index === 0 && trailing}
          </Fragment>
        );
      })}
    </>
  );
};
