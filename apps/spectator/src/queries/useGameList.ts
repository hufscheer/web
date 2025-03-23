import { useInfiniteQuery } from '@tanstack/react-query';

import { getGameList } from '@/api/game';
import { GameListParams, GameListType } from '@/types/game';
import { formatTime } from '@/utils/time';

export const GAME_LIST_QUERY_KEY = 'game-list';
export const useGameList = (params: Omit<GameListParams, 'cursor' | 'size'>) => {
  const query = useInfiniteQuery({
    queryKey: [GAME_LIST_QUERY_KEY, params],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getGameList({
        ...params,
        cursor: pageParam || '',
      }),
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id || null,
    select: (data) => {
      const gameMap = new Map<string, GameListType[]>();

      data.pages.flatMap((gameList) => {
        gameList.forEach((game) => {
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

  if (query.error) throw query.error;

  return query;
};
