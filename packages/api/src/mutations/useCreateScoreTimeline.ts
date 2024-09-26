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

const useCreateScoreTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateScoreTimeline,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.timeline(variables.gameId));
      await queryClient.invalidateQueries(queryKeys.game(variables.gameId));
    },
  });
};

export default useCreateScoreTimeline;
