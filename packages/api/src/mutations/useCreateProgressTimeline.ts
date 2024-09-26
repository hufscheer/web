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

const useCreateProgressTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateProgressTimeline,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.timeline(variables.gameId));
      await queryClient.invalidateQueries(queryKeys.game(variables.gameId));
    },
  });
};

export default useCreateProgressTimeline;
