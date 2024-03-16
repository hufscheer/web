'use client';

import { ReactElement } from 'react';

import { FilterProvider } from '@/app/FilterContext';
import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import { GameState } from '@/types/game';

import GameFilter from './_components/GameFilter';
import GameList from './_components/GameList';

export default function Page() {
  return (
    <FilterProvider>
      <GameFilter />
      {GAMES.map(game => (
        <AsyncBoundary
          key={game.key}
          errorFallback={() => game.errorFallback()}
          loadingFallback={game.loadingFallback}
        >
          <GameList state={game.key} />
        </AsyncBoundary>
      ))}
    </FilterProvider>
  );
}

type Games = {
  key: GameState;
  errorFallback: () => ReactElement;
  loadingFallback: ReactElement;
};

const GAMES: Games[] = [
  {
    key: 'playing',
    errorFallback: GameList.PlayingErrorFallback,
    loadingFallback: <Loader />,
  },
  {
    key: 'scheduled',
    errorFallback: GameList.ScheduledErrorFallback,
    loadingFallback: <Loader />,
  },
  {
    key: 'finished',
    errorFallback: GameList.FinishedErrorFallback,
    loadingFallback: <Loader />,
  },
];
