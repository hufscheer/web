import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  gameId: number;
  lineupPlayerId: number;
};

export const putLineupPlayerCaptainRegister = ({ gameId, lineupPlayerId }: Request) => {
  return fetcher.put<void>(`games/${gameId}/lineup-players/${lineupPlayerId}/captain/register`, {
    json: null,
  });
};

export const useUpdateGamesCaptainRegister = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: putLineupPlayerCaptainRegister,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
