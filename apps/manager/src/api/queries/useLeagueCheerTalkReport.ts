import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkListResponse, LeagueCheerTalkPayload } from '~/api';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

export const useLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useQuery(queryKeys.leagues.cheerTalksReported(payload));

export const useSuspenseLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerTalksReported(payload));

export const useSuspenseInfiniteLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    queryKey: queryKeys.leagues.cheerTalksReportedInfinite(payload).queryKey,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      fetcher.get<CheerTalkListResponse>(`leagues/${payload.leagueId}/cheer-talks/reported`, {
        searchParams: { cursor: pageParam > 0 ? pageParam : '', size: payload.size },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => [
      ...new Map(data.pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
    ],
  });
