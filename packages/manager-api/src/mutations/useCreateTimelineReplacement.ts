import { useMutation, useQueryClient } from '@hcc/api-base';

import type { ReplacementType } from '../types';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

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
        qc.refetchQueries({ queryKey: queryKeys.games.timeline({ gameId }).queryKey, type: 'all' }),
        qc.refetchQueries({ queryKey: queryKeys.games.lineup({ gameId }).queryKey, type: 'all' }),
        qc.refetchQueries({
          queryKey: queryKeys.games.lineupPlaying({ gameId }).queryKey,
          type: 'all',
        }),
      ]);
    },
  });
};
