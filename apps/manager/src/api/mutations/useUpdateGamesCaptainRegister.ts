import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import { queryKeys } from '~/api/queryKey';

type Request = {
  gameId: number;
  lineupPlayerId: number;
};

export const patchLineupPlayerCaptainRegister = ({ gameId, lineupPlayerId }: Request) => {
  return fetcher.patch<void>(`games/${gameId}/lineup-players/${lineupPlayerId}/captain/register`, {
    json: null,
  });
};

export const useUpdateGamesCaptainRegister = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchLineupPlayerCaptainRegister,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
