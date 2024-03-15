'use client';

import dayjs from 'dayjs';
import { ReactElement } from 'react';

import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import useQueryParams from '@/hooks/useQueryParams';
import { GameState } from '@/types/game';

import GameList from './_components/GameList';
import LeagueList from './_components/LeagueList';
import SportsList from './_components/SportsList';
import { section } from './page.css';

export default function Page() {
  const { params, setInParams } = useQueryParams();

  const selectedYear = params.get('year') || String(dayjs().year());
  const selectedLeagueId = params.get('league_id') || '39';
  const selectedSportId = params.get('sport_id') || '';

  return (
    <section className={section}>
      <AsyncBoundary
        errorFallback={() => <div>에러</div>}
        loadingFallback={<div>스켈레톤</div>}
      >
        <LeagueList
          year={selectedYear}
          selectedLeagueId={selectedLeagueId}
          onClick={setInParams}
        />
      </AsyncBoundary>
      <AsyncBoundary errorFallback={() => <></>} loadingFallback={<></>}>
        <SportsList
          selectedSportId={selectedSportId}
          leagueId={selectedLeagueId}
          onClick={setInParams}
        />
      </AsyncBoundary>

      {GAMES.map(game => (
        <AsyncBoundary
          key={game.key}
          errorFallback={() => game.errorFallback()}
          loadingFallback={game.loadingFallback}
        >
          <GameList state={game.key} />
        </AsyncBoundary>
      ))}
    </section>
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
