import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: number;
  timelineId: number;
};

export const deleteTimeline = ({ gameId, timelineId }: Request) => {
  return fetcher.delete<void>(`games/${gameId}/timelines/${timelineId}`, {
    json: null,
  });
};

export const useDeleteTimeline = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteTimeline,
    onSuccess: async () => {
      await Promise.all([
        qc.refetchQueries({ queryKey: queryKeys.games.timeline({ gameId }).queryKey, type: 'all' }),
        qc.refetchQueries({
          queryKey: queryKeys.games.progressAvailable({ gameId }).queryKey,
          type: 'all',
        }),
        qc.refetchQueries({ queryKey: queryKeys.games.lineup({ gameId }).queryKey, type: 'all' }),
        qc.refetchQueries({
          queryKey: queryKeys.games.lineupPlaying({ gameId }).queryKey,
          type: 'all',
        }),
        qc.refetchQueries({ queryKey: queryKeys.games.detail({ gameId }).queryKey, type: 'all' }),
      ]);
    },
  });
};
