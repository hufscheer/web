import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

import type { GameTeamLineupCreateRequest } from '../types/games';

export const postGameTeamsLineup = ({ gameTeamId, ...request }: GameTeamLineupCreateRequest) => {
  // 서버가 새 lineupPlayerId 를 JSON 숫자로 돌려준다
  return fetcher.post<number>(`game-teams/${gameTeamId}/lineup-players`, { json: request });
};

export const useCreateGameTeamsLineup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postGameTeamsLineup,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.games.lineup._def });
    },
  });
};
