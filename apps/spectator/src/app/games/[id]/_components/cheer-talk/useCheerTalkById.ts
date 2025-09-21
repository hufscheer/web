import { useSuspenseInfiniteQuery } from '@hcc/api-base';
import type { CheerTalkType, GameCheerTalkWithTeamInfo } from '~/api';
import { queryKeys } from '~/api/queryKey';
import { useSuspenseGameTeamInfo } from './useGameTeamInfo';

export default function useCheerTalkById(gameId: number) {
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  const query = useSuspenseInfiniteQuery({
    ...queryKeys.games.cheertalk({ gameId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CheerTalkType[]) => lastPage[0]?.cheerTalkId || null,
    select: data => {
      const allPages: GameCheerTalkWithTeamInfo[] = [];

      for (let i = data.pages.length - 1; i >= 0; i--) {
        const page = data.pages[i] as CheerTalkType[];
        const mappedPage = page.map((talk: CheerTalkType) => ({
          ...talk,
          ...getTeamInfo(talk.gameTeamId),
        }));
        allPages.push(...mappedPage);
      }

      return {
        pages: allPages,
        pageParams: [...data.pageParams].reverse(),
      };
    },
    staleTime: 1000,
  });

  if (query.data.pageParams.length === 0) throw query.error;
  if (query.error) throw query.error;

  return query;
}
