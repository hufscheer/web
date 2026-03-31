import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher, queryKeys } from '~/api/queryKey';

type Request = {
  gameId: number;
};

export const patchLineupPlayerToStarter = ({
  gameId,
  lineupPlayerId,
}: Request & { lineupPlayerId: number }) => {
  return fetcher.patch<void>(`games/${gameId}/lineup-players/${lineupPlayerId}/starter`, {
    json: null,
  });
};

export const useUpdateGamesStarter = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchLineupPlayerToStarter,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
