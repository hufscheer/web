import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import useIntersect from '@/hooks/useInfiniteObserver';
import { useGameList } from '@/queries/useGameList';
import { GameState } from '@/types/game';

import GameCard from './Card';
import {
  FinishedGameListErrorFallback,
  PlayingGameListErrorFallback,
  ScheduledGameListErrorFallback,
} from './Error';
import * as styles from './GameList.css';

type GameListProps = {
  state: GameState;
};

export default function GameList({ state }: GameListProps) {
  const { groupedGameList, ...rest } = useGameList({
    state,
  });

  const { fetchNextPage, hasNextPage, isFetching } = rest;
  const { ref } = useIntersect<HTMLDivElement>(
    async (entry, observer): Promise<void> => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
  );

  return (
    <>
      <div className={styles.root}>
        {groupedGameList.map(gameList => {
          return (
            <ul key={gameList.startTime} className={styles.listRoot}>
              <div className={styles.dateRow}>{gameList.startTime}</div>
              {gameList.data.map(game => (
                <AsyncBoundary
                  errorFallback={GameCard.ErrorFallback}
                  loadingFallback={<Loader />}
                  key={game.id}
                >
                  <GameCard info={game} state={state} {...rest} />
                </AsyncBoundary>
              ))}
            </ul>
          );
        })}
      </div>
      <div ref={ref}></div>
    </>
  );
}

GameList.PlayingErrorFallback = PlayingGameListErrorFallback;
GameList.ScheduledErrorFallback = ScheduledGameListErrorFallback;
GameList.FinishedErrorFallback = FinishedGameListErrorFallback;
