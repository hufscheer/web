import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

type Request = {
  gameId: number;
  lineupPlayerId: number;
  position: string | null;
};

export const patchLineupPlayerPosition = ({ gameId, lineupPlayerId, position }: Request) => {
  return fetcher.patch<void>(`games/${gameId}/lineup-players/${lineupPlayerId}/position`, {
    json: { position },
  });
};

export const useUpdateGamesPosition = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchLineupPlayerPosition,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
