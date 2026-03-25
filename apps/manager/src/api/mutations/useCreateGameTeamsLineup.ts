import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import { queryKeys } from '~/api/queryKey';

import type { GameTeamLineupCreateRequest } from '../types/games';

export const postGameTeamsLineup = ({ gameTeamId, ...request }: GameTeamLineupCreateRequest) => {
  const payload = {
    teamPlayerId: request.teamPlayerId,
    state: request.state,
    isCaptain: request.isCaptain,
  };
  console.log('[API] 라인업에 선수 추가 (POST /lineup-players):', {
    url: `game-teams/${gameTeamId}/lineup-players`,
    body: payload,
  });
  return fetcher.post<void>(`game-teams/${gameTeamId}/lineup-players`, { json: payload });
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
