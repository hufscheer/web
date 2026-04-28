import { useMutation, useQueryClient } from '@hcc/api-base';

import type { ReplacementType } from '~/api';

import { fetcher, queryKeys } from '~/api/queryKey';

export const postTimelineReplace = ({ gameId, ...request }: ReplacementType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/replacement`, {
    json: request,
  });
};

export const useCreateTimelinesReplace = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postTimelineReplace,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({
          queryKey: queryKeys.games.timeline({ gameId }).queryKey,
          refetchType: 'all',
        }),
        qc.invalidateQueries({
          queryKey: queryKeys.games.lineup({ gameId }).queryKey,
          refetchType: 'all',
        }),
      ]);
    },
  });
};
