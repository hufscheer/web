import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getGameCheerTalkById } from '@/src/api/game';
import { GameCheerTalkWithTeamInfo } from '@/src/types/game';

import { useGameTeamInfo } from './useGameTeamInfo';

export default function useCheerTalkById(gameId: string) {
  const { getTeamInfo } = useGameTeamInfo(gameId);

  const query = useSuspenseInfiniteQuery({
    queryKey: ['game-cheertalk', gameId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getGameCheerTalkById(gameId, pageParam || ''),
    getNextPageParam: (lastPage) => lastPage[0]?.cheerTalkId || null,
    select: (data) => ({
      pages: data.pages.reduce<GameCheerTalkWithTeamInfo[]>(
        (acc, page) => [
          ...page.map((talk) => ({
            ...talk,
            ...getTeamInfo(talk.gameTeamId),
          })),
          ...acc,
        ],
        [],
      ),
      pageParams: [...data.pageParams].reverse(),
    }),

    // refetch options
    staleTime: 1000,
  });

  if (query.data.pageParams.length === 0) throw query.error;
  if (query.error) throw query.error;

  return query;
}
