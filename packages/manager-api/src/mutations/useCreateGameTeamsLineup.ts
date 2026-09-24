import { useMutation, useQueryClient } from '@hcc/api-base';

import type { GameTeamLineupCreateRequest } from '../types/games';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

export const postGameTeamsLineup = ({ gameTeamId, ...request }: GameTeamLineupCreateRequest) => {
  return fetcher.post<void>(`game-teams/${gameTeamId}/lineup-players`, { json: request });
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
