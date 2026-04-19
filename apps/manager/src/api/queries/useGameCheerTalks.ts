import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@hcc/api-base';

import type { CheerTalkType, GameCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGamesCheerTalks = (payload: GameCheerTalkPayload) =>
  useQuery(queryKeys.games.cheerTalks(payload));

export const useSuspenseGamesCheerTalks = (payload: GameCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.games.cheerTalks(payload));

export const useSuspenseInfiniteGamesCheerTalks = (payload: GameCheerTalkPayload) =>
  useSuspenseInfiniteQuery({
    ...queryKeys.games.cheerTalks(payload),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) =>
      lastPage.length === payload.size
        ? (lastPage[lastPage.length - 1]?.cheerTalkId ?? null)
        : null,
  });
