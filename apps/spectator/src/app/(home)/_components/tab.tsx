'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Badge, Button, Typography } from '@hcc/ui';
import NumberFlow from '@number-flow/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import type { GameListType, LeagueCheerCountType } from '~/api';

import { useSuspenseLeagueCheerCount } from '~/api/queries/useLeagueCheerCount';
import { useSuspenseLeagueRecentGames } from '~/api/queries/useLeagueRecentGames';
import { GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';
import { useTracker } from '~/hooks/useTracker';

export const RecentTab = () => {
  const { data: recentGames } = useSuspenseLeagueRecentGames();
  const displayedGame = recentGames.at(0);
  // const { data: scheduled } = useSuspenseGames({ state: 'SCHEDULED', size: 99999999 });
  // const { data: playing } = useSuspenseGames({ state: 'PLAYING', size: 99999999 });
  // const { data: finished } = useSuspenseGames({ state: 'FINISHED', size: 99999999 });

  // // const { data: scheduledLeague } = useSuspenseLeagues({});
  // // const { data: playingLeague } = useSuspenseLeagues({});
  // // const { data: finishedLeague } = useSuspenseLeagues({});

  // // console.log('scheduledLeague', scheduledLeague);
  // // console.log('playingLeague', playingLeague);
  // // console.log('finishedLeague', finishedLeague);

  // console.log('scheduled', scheduled);
  // console.log('playing', playing);
  // // console.log('finished', finished.sort((a, b) => a.leagueId - b.leagueId).at(-1));
  // console.log('finished', finished);

  // const hasPlayingGames = playing.length !== 0;
  // // const recentFinished = finished.sort((a, b) => a.leagueId - b.leagueId).at(-1);
  // // const displayedGame = hasPlayingGames ? playing.at(-1) : recentFinished;
  // const displayedGame = getDisplayGame({ playing, scheduled, finished });

  if (!displayedGame) return null;

  const hasPlayingGames = displayedGame.games.some((game) => game.state === 'PLAYING');
  const buttonLabel = hasPlayingGames ? '응원하러 가기' : '지난 경기 보러가기';

  const { data: cheerCount } = useSuspenseLeagueCheerCount(
    { leagueId: displayedGame?.leagueId },
    { refetchInterval: hasPlayingGames ? 10000 : false },
  );

  return (
    <>
      <div className="flex flex-1 flex-col gap-3">
        <GameList
          cheerCount={cheerCount.cheerTalkCount}
          leagueId={displayedGame.leagueId}
          leagueName={displayedGame.leagueName}
          games={displayedGame.games}
          buttonLabel={buttonLabel}
        />
      </div>
    </>
  );
};

interface GameListProps {
  leagueId: number;
  leagueName: string;
  games: GameListType[];
  cheerCount: LeagueCheerCountType['cheerTalkCount'];
  buttonLabel: string;
}

const GameList = ({ leagueId, leagueName, games, cheerCount, buttonLabel }: GameListProps) => {
  const sendEvent = useTracker({ category: 'Home' });
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
          <Badge variant="primary" size="sm">
            <NumberFlow format={{ notation: 'compact' }} value={cheerCount} />
            개의 응원톡 💬
          </Badge>
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
            {index === 0 && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                color="primary"
                className="gap"
                onClick={() => sendEvent({ action: 'click', value: buttonLabel })}
              >
                <Link href={{ pathname: `/games/${game.id}`, query: { tab: 'cheer' } }}>
                  {buttonLabel}
                  <ChevronForwardIcon className="animate-[arrow_1s_ease-in-out_infinite] " />
                </Link>
              </Button>
            )}
          </Fragment>
        );
      })}
    </>
  );
};
