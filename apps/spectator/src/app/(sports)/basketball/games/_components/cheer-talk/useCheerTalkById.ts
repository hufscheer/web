import { useSuspenseInfiniteQuery } from '@hcc/api-base';

import type { CheerTalkListResponse } from '~/api';

import { queryKeys } from '~/api/queryKey';

import { useSuspenseGameTeamInfo } from './useGameTeamInfo';

export default function useCheerTalkById(gameId: number) {
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  return useSuspenseInfiniteQuery({
    ...queryKeys.games.cheertalk({ gameId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkListResponse) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    select: (data) => ({
      pages: data.pages
        .map((page) =>
          page.content.map((talk) => ({
            ...talk,
            ...getTeamInfo(talk.gameTeamId),
          })),
        )
        .reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
    staleTime: Number.POSITIVE_INFINITY,
  });
}
