import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeagueCheerTalkBlocked = (leagueId: string) =>
  useSuspenseInfiniteQuery({
    queryKey: queryKeys.leagueCheerTalksBlocked({ leagueId }).queryKey,
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      queryKeys
        .leagueCheerTalksBlocked({ leagueId, cursor: pageParam || '' })
        .queryFn(),
    select: data => ({
      pages: data.pages.flatMap(page => page),
      pageParams: data.pageParams,
    }),
    getNextPageParam: lastPage =>
      lastPage[lastPage.length - 1]?.cheerTalkId || null,

    staleTime: 1000,
  });

export default useLeagueCheerTalkBlocked;
