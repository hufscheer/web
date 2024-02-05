import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { getMatchById, getMatchCommentById } from '@/api/match';

export default function useMatchCommentById(matchId: string) {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: ['match-comment', matchId],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => getMatchCommentById(matchId, pageParam || ''),
      getNextPageParam: lastPage => lastPage[0]?.commentId || null,
      select: data => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const { data: matchTeams, error: matchError } = useSuspenseQuery({
    queryKey: ['match-detail', 'for-comment', matchId],
    queryFn: () => getMatchById(matchId),
    select: data => data.gameTeams,
  });

  return {
    commentList: data,
    matchTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
    matchError,
  };
}
