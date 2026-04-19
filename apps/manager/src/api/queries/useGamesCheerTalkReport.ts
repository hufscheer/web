import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkType, GameCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGamesCheerTalkReport = (payload: GameCheerTalkPayload) =>
  useQuery(queryKeys.games.cheerTalksReported(payload));

export const useSuspenseGamesCheerTalkReport = (payload: GameCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.games.cheerTalksReported(payload));

export const useSuspenseInfiniteGamesCheerTalkReport = (payload: GameCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    ...queryKeys.games.cheerTalksReported(payload),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
