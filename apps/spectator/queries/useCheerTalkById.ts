import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getGameCheerTalkById } from '@/api/game';
import { GameCheerTalkWithTeamInfo } from '@/types/game';

import { useGameTeamInfo } from './useGameTeamInfo';

export default function useCheerTalkById(gameId: string) {
  const { getTeamInfo } = useGameTeamInfo(gameId);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['game-cheertalk', gameId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getGameCheerTalkById(gameId, pageParam || ''),
    getNextPageParam: lastPage => lastPage[0]?.cheerTalkId || null,
    select: data => ({
      pages: data.pages.reduce<GameCheerTalkWithTeamInfo[]>(
        (acc, page) => [
          ...page.map(talk => ({
            ...talk,
            ...getTeamInfo(talk.gameTeamId),
          })),
          ...acc,
        ],
        [],
      ),
      pageParams: [...data.pageParams].reverse(),
    }),
  });

  if (error) throw error;

  return {
    cheerTalkList: data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
  };
}
