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
      await queryClient.invalidateQueries(queryKeys.timeline(variables.gameId));
      await queryClient.invalidateQueries(queryKeys.game(variables.gameId));
    },
  });
};

export default useDeleteTimeline;
