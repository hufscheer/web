import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

type Request = {
  gameId: number;
  lineupPlayerId: number;
};

export const patchLineupPlayerCaptainRevoke = ({ gameId, lineupPlayerId }: Request) => {
  return fetcher.patch<void>(`games/${gameId}/lineup-players/${lineupPlayerId}/captain/revoke`, {
    json: null,
  });
};

export const useUpdateGamesCaptainRevoke = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchLineupPlayerCaptainRevoke,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
