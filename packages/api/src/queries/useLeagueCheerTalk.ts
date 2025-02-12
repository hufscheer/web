import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useLeagueCheerTalk = (leagueId: string) =>
  useSuspenseInfiniteQuery({
    queryKey: queryKeys.leagueCheerTalks({ leagueId }).queryKey,
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      queryKeys
        .leagueCheerTalks({ leagueId, cursor: pageParam || '' })
        .queryFn(),
    select: data => ({
      pages: data.pages.flatMap(page => page),
      pageParams: data.pageParams,
    }),
    getNextPageParam: lastPage =>
      lastPage[lastPage.length - 1]?.cheerTalkId || null,

    staleTime: 1000,
  });
