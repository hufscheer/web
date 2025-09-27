import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import type { ScoreType } from '~/api';
import { queryKeys } from '~/api/queryKey';

export const postTimelineScore = ({ gameId, ...request }: ScoreType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/score`, {
    json: request,
  });
};

export const useCreateTimelines = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.games.timeline({ gameId }).queryKey,
    mutationFn: postTimelineScore,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
      });
    },
  });
};
