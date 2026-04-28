import { useMutation, useQueryClient } from '@hcc/api-base';

import type { ProgressStateType } from '~/api';

import { fetcher, queryKeys } from '~/api/queryKey';

export const postTimelineProgress = ({ gameId, ...request }: ProgressStateType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/progress`, {
    json: request,
  });
};

export const useCreateTimelinesProgress = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postTimelineProgress,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({
          queryKey: queryKeys.games.timeline({ gameId }).queryKey,
          refetchType: 'all',
        }),
        qc.invalidateQueries({
          queryKey: queryKeys.games.progressAvailable({ gameId }).queryKey,
          refetchType: 'all',
        }),
        qc.invalidateQueries({
          queryKey: queryKeys.games.detail({ gameId }).queryKey,
          refetchType: 'all',
        }),
      ]);
    },
  });
};
