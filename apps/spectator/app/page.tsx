'use client';

import AsyncBoundary from '@/components/AsyncBoundary';
import SportsList from '@/components/league/SportsList';
import Loader from '@/components/Loader';
import { QUERY_PARAMS } from '@/constants/queryParams';
import useQueryParams from '@/hooks/useQueryParams';
import SportsListFetcher from '@/queries/useSportsListByLeagueId/Fetcher';
import { GameState } from '@/types/game';

import GameList from './_components/GameList';
import { section, statusButton, statusCheckbox } from './page.css';

export default function Page() {
  const { params, repeatIterator, appendToParams, setInParams } =
    useQueryParams();

  const paramsObj = repeatIterator(
    {} as { status: GameState },
    params.entries(),
  );

  return (
    <section className={section}>
      <AsyncBoundary
        errorFallback={() => <SportsList.Skeleton />}
        loadingFallback={<SportsList.Skeleton />}
      >
        <SportsListFetcher leagueId={params.get('leagueId') || '39'}>
          {data => (
            <SportsList
              selectedId={paramsObj[QUERY_PARAMS.sports] as string[]}
              sportsList={data}
              onClick={appendToParams}
            />
          )}
        </SportsListFetcher>
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

      <AsyncBoundary
        errorFallback={GameList.PlayingErrorFallback}
        loadingFallback={<Loader />}
      >
        <GameList state="playing" />
      </AsyncBoundary>
      <AsyncBoundary
        errorFallback={GameList.ScheduledErrorFallback}
        loadingFallback={<Loader />}
      >
        <GameList state="scheduled" />
      </AsyncBoundary>
      <AsyncBoundary
        errorFallback={GameList.FinishedErrorFallback}
        loadingFallback={<Loader />}
      >
        <GameList state="finished" />
      </AsyncBoundary>
    </section>
  );
}
