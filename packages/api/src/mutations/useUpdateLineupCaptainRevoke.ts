import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: string;
  gameTeamId: string;
  lineupPlayerId: number;
};

const patchUpdateLineupCaptainRevoke = ({
  gameId,
  gameTeamId,
  lineupPlayerId,
}: Request) => {
  return fetcher.patch<void>(
    `/games/${gameId}/${gameTeamId}/lineup-players/${lineupPlayerId}/captain/revoke`,
  );
};

const useUpdateLineupCaptainRevoke = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateLineupCaptainRevoke,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.lineup(variables.gameId));
      await queryClient.invalidateQueries(
        queryKeys.lineupPlaying(variables.gameId),
      );
    },
  });
};

export default useUpdateLineupCaptainRevoke;
