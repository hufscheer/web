import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import { queryKeys } from '../queryKey';

export type Request = {
  gameId: number;
  gameTeamId: number;
  cheerCount: number;
};

export const postGameCheer = ({ gameId, ...request }: Request) => {
  return fetcher.post<void>(`games/${gameId}/cheer`, { json: request });
};

export const useUpdateGameCheer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postGameCheer,
    onSuccess: async (_, { gameId }) =>
      await qc.invalidateQueries({ queryKey: queryKeys.games.cheer({ gameId }).queryKey }),
  });
};
