import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useGameCheerTalk = (gameId: string) =>
  useSuspenseInfiniteQuery({
    queryKey: queryKeys.gameCheerTalks({ gameId }).queryKey,
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      queryKeys.gameCheerTalks({ gameId, cursor: pageParam || '' }).queryFn(),
    select: data => ({
      pages: data.pages.flatMap(page => page),
      pageParams: data.pageParams,
    }),
    getNextPageParam: lastPage =>
      lastPage[lastPage.length - 1]?.cheerTalkId || null,

    staleTime: 1000,
  });
