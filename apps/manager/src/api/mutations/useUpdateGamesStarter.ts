import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import { queryKeys } from '~/api/queryKey';

type Request = {
  gameId: number;
};

export const patchTeamPlayersStarter = ({
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
    mutationFn: patchTeamPlayersStarter,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
