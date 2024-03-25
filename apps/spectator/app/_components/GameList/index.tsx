'use client';

import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useGameList } from '@/queries/useGameList';
import useLeagueDetailQuery from '@/queries/useLeagueDetail';
import { GameState } from '@/types/game';

import GameCard from './Card';
import * as styles from './GameList.css';

type GameListProps = {
  state: GameState;
  initialLeagueId: string;
  initialRound: number;
};

export default function GameList({ state, initialLeagueId }: GameListProps) {
  const searchParams = useSearchParams();
  const { data: leagueDetail } = useLeagueDetailQuery(Number(initialLeagueId));
  const currentRound = leagueDetail?.inProgressRound.toString();

  const { data: groupedGameList, ...rest } = useGameList({
    league_id: searchParams.get('league') || initialLeagueId,
    sport_id: searchParams.get('sports') || undefined,
    round: searchParams.get('round') || currentRound,
    league_team_id: searchParams.get('leagueTeam') || undefined,
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

  if (!groupedGameList || !groupedGameList.length) return null;

  return (
    <>
      <div className={styles.root}>
        {groupedGameList?.map(gameList => (
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
