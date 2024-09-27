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

const useCreateReplacementTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateReplacementTimeline,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.timeline(variables.gameId));
      await queryClient.invalidateQueries(queryKeys.game(variables.gameId));
    },
  });
};

export default useCreateReplacementTimeline;
