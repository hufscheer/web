import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: string;
  gameTeamId: string;
  lineupPlayerId: number;
};

const patchUpdateLineupCaptainRegister = ({
  gameId,
  gameTeamId,
  lineupPlayerId,
}: Request) => {
  return fetcher.patch<void>(
    `/games/${gameId}/${gameTeamId}/lineup-players/${lineupPlayerId}/captain/register`,
  );
};

const useUpdateLineupCaptainRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateLineupCaptainRegister,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.lineup(variables.gameId));
      await queryClient.invalidateQueries(
        queryKeys.lineupPlaying(variables.gameId),
      );
    },
  });
};

export default useUpdateLineupCaptainRegister;
