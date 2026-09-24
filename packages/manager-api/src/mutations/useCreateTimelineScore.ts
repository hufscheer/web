import { useMutation, useQueryClient } from '@hcc/api-base';

import type { ScoreType } from '../types';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

export const postTimelineScore = ({ gameId, ...request }: ScoreType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/score`, {
    json: request,
  });
};

export const useCreateTimelineScore = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postTimelineScore,
    onSuccess: async () => {
      await Promise.all([
        qc.refetchQueries({ queryKey: queryKeys.games.timeline({ gameId }).queryKey, type: 'all' }),
        qc.refetchQueries({ queryKey: queryKeys.games.detail({ gameId }).queryKey, type: 'all' }),
      ]);
    },
  });
};
