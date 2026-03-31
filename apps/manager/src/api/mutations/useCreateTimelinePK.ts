import { useMutation, useQueryClient } from '@hcc/api-base';

import type { PkType } from '~/api';

import { fetcher, queryKeys } from '~/api/queryKey';

export const postTimelinePK = ({ gameId, ...request }: PkType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/pk`, {
    json: request,
  });
};

export const useCreateTimelinePK = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.games.timeline({ gameId }).queryKey,
    mutationFn: postTimelinePK,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
      });
    },
  });
};
