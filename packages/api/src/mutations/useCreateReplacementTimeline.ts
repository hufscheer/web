import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { ReplacementCreateType } from '../types';

type Request = ReplacementCreateType & {
  gameId: string;
};

const postCreateReplacementTimeline = (request: Request) => {
  const { gameId, ...rest } = request;
  return fetcher.post<void>(`/games/${gameId}/timelines/replacement`, {
    ...rest,
  });
};

export const useCreateReplacementTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateReplacementTimeline,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.timeline(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.game(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
        queryClient.invalidateQueries(queryKeys.gameLineup(variables.gameId)),
        queryClient.invalidateQueries(
          queryKeys.gameLineupPlaying(variables.gameId),
        ),
      ]);
    },
  });
};
