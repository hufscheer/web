import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: string;
  lineupPlayerId: number;
};

const patchUpdateLineupCandidate = ({ gameId, lineupPlayerId }: Request) => {
  return fetcher.patch<void>(
    `/games/${gameId}/lineup-players/${lineupPlayerId}/candidate`,
  );
};

const useUpdateLineupCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateLineupCandidate,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.lineup(variables.gameId));
      await queryClient.invalidateQueries(
        queryKeys.lineupPlaying(variables.gameId),
      );
    },
  });
};

export default useUpdateLineupCandidate;
