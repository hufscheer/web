'use client';

import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useGameList } from '@/queries/useGameList';
import { GameState } from '@/types/game';

import GameCard from './Card';
import * as styles from './GameList.css';

type GameListProps = {
  state: GameState;
  leagueId: string | undefined;
  sportId: string | undefined;
  round: string | undefined;
};

export default function GameList({
  state,
  leagueId,
  round,
  sportId,
}: GameListProps) {
  const searchParams = useSearchParams();
  const { groupedGameList, ...rest } = useGameList({
    league_id: searchParams.get('league') || leagueId,
    sport_id: searchParams.get('sports') || sportId,
    round: searchParams.get('round') || round,
    state,
  });

  const { fetchNextPage, hasNextPage, isFetching } = rest;
  const { ref } = useIntersectionObserver<HTMLDivElement>(
    async (entry, observer): Promise<void> => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
  );

  if (!groupedGameList) return null;

  return (
    <>
      <div className={styles.root}>
        {groupedGameList.map(gameList => (
          <Fragment key={gameList.startTime}>
            <div className={styles.dateRow}>{gameList.startTime}</div>
            <ul className={styles.listRoot}>
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
          </Fragment>
        ))}
      </div>
      <div ref={ref}></div>
    </>
  );
}
