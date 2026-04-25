import { useMutation, useQueryClient } from '@hcc/api-base';

import type { FoulType } from '~/api/types';

import { fetcher, queryKeys } from '~/api/queryKey';

export const postTimelineFoul = ({ gameId, ...request }: FoulType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/foul`, {
    json: request,
  });
};

export const useCreateTimelineFoul = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.games.timeline({ gameId }).queryKey,
    mutationFn: postTimelineFoul,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
      });
    },
  });
};
