import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: string;
  lineupPlayerId: number;
};

const putUpdateCandidateLineup = (request: Request) => {
  const { gameId, lineupPlayerId } = request;
  return fetcher.put<void>(
    `/games/${gameId}/lineup-players/${lineupPlayerId}/candidate`,
  );
};

const useUpdateCandidateLineup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateCandidateLineup,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.lineup(variables.gameId));
      await queryClient.invalidateQueries(
        queryKeys.lineupPlaying(variables.gameId),
      );
    },
  });
};

export default useUpdateCandidateLineup;
