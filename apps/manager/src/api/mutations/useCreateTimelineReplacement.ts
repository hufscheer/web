import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import type { ReplacementType } from '~/api';

import { queryKeys } from '~/api/queryKey';

export const postTimelineReplace = ({ gameId, ...request }: ReplacementType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/replacement`, {
    json: request,
  });
};

export const useCreateTimelinesReplace = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.games.timeline({ gameId }).queryKey,
    mutationFn: postTimelineReplace,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
      });
    },
  });
};
