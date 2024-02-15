import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { getGameById, getGameCommentById } from '@/api/game';

export default function useGameCommentById(gameId: string) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: ['game-comment', gameId],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => getGameCommentById(gameId, pageParam || ''),
      getNextPageParam: lastPage => lastPage[0]?.commentId || null,
      select: data => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const { data: gameTeams, error: gameError } = useSuspenseQuery({
    queryKey: ['game-detail', 'for-comment', gameId],
    queryFn: () => getGameById(gameId),
    select: data => data.gameTeams,
  });

  return {
    commentList: data,
    gameTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
    gameError,
  };
}
