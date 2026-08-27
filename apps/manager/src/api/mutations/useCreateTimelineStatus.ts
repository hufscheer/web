import { useMutation, useQueryClient } from '@hcc/api-base';

import type { ProgressStateType } from '~/api';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

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
        qc.refetchQueries({ queryKey: queryKeys.games.timeline({ gameId }).queryKey, type: 'all' }),
        qc.refetchQueries({
          queryKey: queryKeys.games.progressAvailable({ gameId }).queryKey,
          type: 'all',
        }),
        qc.refetchQueries({ queryKey: queryKeys.games.detail({ gameId }).queryKey, type: 'all' }),
      ]);
    },
  });
};
