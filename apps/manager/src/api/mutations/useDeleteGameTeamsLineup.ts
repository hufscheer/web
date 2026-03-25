import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import { queryKeys } from '~/api/queryKey';

type Request = {
  gameTeamId: number;
  lineupPlayerId: number;
};

export const deleteGameTeamsLineup = ({ gameTeamId, lineupPlayerId }: Request) => {
  return fetcher.delete<void>(`game-teams/${gameTeamId}/lineup-players/${lineupPlayerId}`, {
    json: null,
  });
};

export const useDeleteGameTeamsLineup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteGameTeamsLineup,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
