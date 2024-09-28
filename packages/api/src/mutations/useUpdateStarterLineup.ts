import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: string;
  lineupPlayerId: number;
};

const putUpdateStarterLineup = (request: Request) => {
  const { gameId, lineupPlayerId } = request;
  return fetcher.put<void>(
    `/games/${gameId}/lineup-players/${lineupPlayerId}/starter`,
  );
};

const useUpdateStarterLineup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateStarterLineup,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.lineup(variables.gameId));
      await queryClient.invalidateQueries(
        queryKeys.lineupPlaying(variables.gameId),
      );
    },
  });
};

export default useUpdateStarterLineup;
