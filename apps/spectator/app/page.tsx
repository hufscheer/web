'use client';

import dayjs from 'dayjs';
import Link from 'next/link';

import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import { QUERY_PARAMS } from '@/constants/queryParams';
import useQueryParams from '@/hooks/useQueryParams';
import { GameStatus } from '@/types/game';

import LeagueList from './_components/LeagueList';
import SportsList from './_components/SportsList';
import { gameListWrapper, section } from './page.css';

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

      <div className={statusCheckbox}>
        <button
          onClick={() => setInParams(QUERY_PARAMS.status, 'finished')}
          className={
            params.get(QUERY_PARAMS.status) === 'finished'
              ? statusButton['focused']
              : statusButton['default']
          }
        >
          종료
        </button>
        <button
          onClick={() => setInParams(QUERY_PARAMS.status, 'playing')}
          className={
            params.get(QUERY_PARAMS.status) === 'playing' ||
            params.get(QUERY_PARAMS.status) === null
              ? statusButton['focused']
              : statusButton['default']
          }
        >
          진행 중
        </button>
        <button
          onClick={() => setInParams(QUERY_PARAMS.status, 'scheduled')}
          className={
            params.get(QUERY_PARAMS.status) === 'scheduled'
              ? statusButton['focused']
              : statusButton['default']
          }
        >
          예정
        </button>
      </div>

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
  errorFallback: () => JSX.Element;
  loadingFallback: JSX.Element;
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
