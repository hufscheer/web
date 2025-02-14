import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: string;
  lineupPlayerId: number;
};

const patchUpdateLineupStarter = ({ gameId, lineupPlayerId }: Request) => {
  return fetcher.patch<void>(
    `/games/${gameId}/lineup-players/${lineupPlayerId}/starter`,
  );
};

export const useUpdateLineupStarter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateLineupStarter,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.gameLineup(variables.gameId));
      await queryClient.invalidateQueries(
        queryKeys.gameLineupPlaying(variables.gameId),
      );
    },
  });
};
