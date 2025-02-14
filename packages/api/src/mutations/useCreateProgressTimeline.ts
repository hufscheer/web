import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { ProgressCreateType } from '../types';

type Request = ProgressCreateType & {
  gameId: string;
};

const postCreateProgressTimeline = (request: Request) => {
  const { gameId, ...rest } = request;
  return fetcher.post<void>(`/games/${gameId}/timelines/progress`, {
    ...rest,
  });
};

export const useCreateProgressTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateProgressTimeline,
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
