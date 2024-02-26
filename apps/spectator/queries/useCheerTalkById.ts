import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getGameCheerTalkById } from '@/api/game';

import useGameById from './useGameById';

export default function useCheerTalkById(gameId: string) {
  const { gameDetail } = useGameById(gameId);
  const getTeamInfo = (gameTeamId: number) => {
    const order = gameDetail.gameTeams.findIndex(
      team => team.gameTeamId === gameTeamId,
    );

    return {
      direction: (['left', 'right'] as const)[order],
      logoImageUrl: gameDetail.gameTeams[order].logoImageUrl,
    };
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: ['game-cheertalk', gameId],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => getGameCheerTalkById(gameId, pageParam || ''),
      getNextPageParam: lastPage => lastPage[0]?.cheerTalkId || null,
      select: data => ({
        pages: [
          ...data.pages.flat().map(talk => ({
            ...talk,
            ...getTeamInfo(talk.gameTeamId),
          })),
        ].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  if (error) throw error;

  return {
    cheerTalkList: data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
  };
}
