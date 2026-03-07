import { useSuspenseInfiniteQuery } from '@hcc/api-base';
import type { CheerTalkType } from '~/api';
import { queryKeys } from '~/api/queryKey';
import { useSuspenseGameTeamInfo } from './useGameTeamInfo';

export default function useCheerTalkById(gameId: number) {
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  return useSuspenseInfiniteQuery({
    ...queryKeys.games.cheertalk({ gameId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) => lastPage[0]?.cheerTalkId || null,
    select: (data) => ({
      pages: data.pages
        .map((page) =>
          page.map((talk) => ({
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
