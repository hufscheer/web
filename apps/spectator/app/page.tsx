'use client';

import AsyncBoundary from '@/components/common/AsyncBoundary';
import GameList from '@/components/game/GameList';
import SportsList from '@/components/league/SportsList';
import { QUERY_PARAMS } from '@/constants/queryParams';
import useQueryParams from '@/hooks/useQueryParams';
import GameListFetcher from '@/queries/useGameList/Fetcher';
import SportsListFetcher from '@/queries/useSportsListByLeagueId/Fetcher';
import { GameStatus } from '@/types/game';

import {
  gameListWrapper,
  section,
  statusButton,
  statusCheckbox,
} from './page.css';

export default function Home() {
  const { params, repeatIterator, appendToParams, setInParams } =
    useQueryParams();

  const paramsObj = repeatIterator(
    {} as { status: GameStatus },
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
        errorFallback={props => <GameList.ErrorFallback {...props} />}
        loadingFallback={<GameList.Skeleton />}
      >
        <GameListFetcher {...paramsObj}>
          {({ gameList }) => (
            <div className={gameListWrapper}>
              <GameList gameList={gameList} />
            </div>
          )}
        </GameListFetcher>
      </AsyncBoundary>
    </section>
  );
}
