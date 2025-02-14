import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: string;
  gameTeamId: number;
  cheerCount: number;
};

const postUpdateGameCheer = ({ gameId, ...payload }: Request) => {
  return fetcher.post<void>(`/games/${gameId}/cheer`, payload);
};

export const useUpdateGameCheer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUpdateGameCheer,
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries(
        queryKeys.gameCheer(variables.gameId),
      );
    },
  });
};
