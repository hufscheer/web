import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { ScoreCreateType } from '../types';

type Request = ScoreCreateType & {
  gameId: string;
};

const postCreateScoreTimeline = (request: Request) => {
  const { gameId, ...rest } = request;
  return fetcher.post<void>(`/games/${gameId}/timelines/score`, {
    ...rest,
  });
};

export const useCreateScoreTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateScoreTimeline,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.timeline(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.game(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
      ]);
    },
  });
};
