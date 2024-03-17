import { Fragment } from 'react';

import { useFilterContext } from '@/app/_contexts/FilterContext';
import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
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
  const { league, sport, leagueTeam } = useFilterContext();
  const { groupedGameList, ...rest } = useGameList({
    league_id: league ? String(league) : undefined,
    sport_id: sport ? String(sport) : undefined,
    league_team_id: leagueTeam ? String(leagueTeam) : undefined,
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

GameList.PlayingErrorFallback = PlayingGameListErrorFallback;
GameList.ScheduledErrorFallback = ScheduledGameListErrorFallback;
GameList.FinishedErrorFallback = FinishedGameListErrorFallback;
