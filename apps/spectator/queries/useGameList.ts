import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getGameList } from '@/api/game';
import getQueryClient from '@/app/getQueryClient';
import { GameListParams, GameListType } from '@/types/game';
import { formatTime } from '@/utils/time';

export const GAME_LIST_QUERY_KEY = 'game-list';
export const useGameList = (
  params: Omit<GameListParams, 'cursor' | 'size'>,
) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: [GAME_LIST_QUERY_KEY, params],
      initialPageParam: 0,
      queryFn: ({ pageParam }) =>
        getGameList({
          ...params,
          cursor: pageParam || '',
        }),
      getNextPageParam: lastPage => lastPage[lastPage.length - 1]?.id || null,
      select: data => {
        const gameMap = new Map<string, GameListType[]>();

        data.pages.flatMap(gameList => {
          gameList.forEach(game => {
            const date = formatTime(game.startTime, 'MM월 DD일 (ddd)');
            const existing = gameMap.get(date);

            if (existing) {
              gameMap.set(date, [...existing, game]);
            } else {
              gameMap.set(date, [game]);
            }
          });
        });

        return Array.from(gameMap, ([startTime, data]) => ({
          startTime,
          data,
        }));
      },
    });

  if (error) throw error;

  return {
    groupedGameList: data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};

export async function useGameListPrefetch(params: GameListParams) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery<GameListType[]>({
    queryKey: [GAME_LIST_QUERY_KEY, params],
    queryFn: () => getGameList(params),
    initialPageParam: 0,
    // getNextPageParam: lastPage => lastPage[lastPage.length - 1]?.id || null,
    // select: data => {
    //   const gameMap = new Map<string, GameListType[]>();

    //   data.pages.flatMap(gameList => {
    //     gameList.forEach(game => {
    //       const date = formatTime(game.startTime, 'MM월 DD일 (ddd)');
    //       const existing = gameMap.get(date);

    //       if (existing) {
    //         gameMap.set(date, [...existing, game]);
    //       } else {
    //         gameMap.set(date, [game]);
    //       }
    //     });
    //   });

    //   return Array.from(gameMap, ([startTime, data]) => ({
    //     startTime,
    //     data,
    //   }));
    // },
  });
}
