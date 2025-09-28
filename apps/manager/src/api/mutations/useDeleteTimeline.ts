import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import { queryKeys } from '~/api/queryKey';

type Request = {
  gameId: number;
  timelineId: number;
};

export const deleteTimelines = ({ gameId, timelineId }: Request) => {
  return fetcher.delete<void>(`games/${gameId}/timelines/${timelineId}`, {
    json: null,
  });
};

export const useDeleteTimelines = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.games.timeline({ gameId }).queryKey,
    mutationFn: deleteTimelines,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
      });
    },
  });
};
