import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { getGameById, getGameCheerTalkById } from '@/api/game';

export default function useGameCheerTalkById(gameId: string) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: ['game-cheertalk', gameId],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => getGameCheerTalkById(gameId, pageParam || ''),
      getNextPageParam: lastPage => lastPage[0]?.cheerTalkId || null,
      select: data => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const { data: gameTeams, error: gameError } = useSuspenseQuery({
    queryKey: ['game-detail', 'for-cheertalk', gameId],
    queryFn: () => getGameById(gameId),
    select: data => data.gameTeams,
  });

  return {
    cheerTalkList: data,
    gameTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
    gameError,
  };
}
