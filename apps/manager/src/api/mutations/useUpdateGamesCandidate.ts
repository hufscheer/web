import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import { queryKeys } from '~/api/queryKey';

type Request = {
  gameId: number;
};

export const patchTeamPlayers = ({
  gameId,
  lineupPlayerId,
}: Request & { lineupPlayerId: number }) => {
  console.log('[API] 선수를 후보로 변경 (PATCH /candidate):', { gameId, lineupPlayerId });
  return fetcher.patch<void>(`games/${gameId}/lineup-players/${lineupPlayerId}/candidate`, {
    json: null,
  });
};

export const useUpdateGamesCandidate = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchTeamPlayers,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
