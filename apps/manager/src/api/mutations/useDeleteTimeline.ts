import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher, queryKeys } from '~/api/queryKey';

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
    mutationKey: queryKeys.games.timeline({ gameId }).queryKey,
    mutationFn: deleteTimeline,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
      });
    },
  });
};
