import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: string;
  timelineId: string;
};

const deleteTimeline = ({ gameId, timelineId }: Request) => {
  return fetcher.delete<void>(`/games/${gameId}/timelines/${timelineId}`);
};

const useDeleteTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTimeline,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.timeline(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.game(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
      ]);
    },
  });
};

export default useDeleteTimeline;
