import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import type { ProgressStateType } from '~/api';
import { queryKeys } from '~/api/queryKey';

export const postTimelineProgress = ({ gameId, ...request }: ProgressStateType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/progress`, {
    json: request,
  });
};

export const useCreateTimelinesProgress = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.games.timeline({ gameId }).queryKey,
    mutationFn: postTimelineProgress,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
      });
    },
  });
};
