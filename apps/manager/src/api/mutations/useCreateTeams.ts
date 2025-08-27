import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import type { TeamType } from '~/api';
import { queryKeys } from '~/api/queryKey';

export type TeamPlayerType = {
  playerId: number;
  jerseyNumber: number;
};

export type TeamFormType = Pick<TeamType, 'name' | 'unit' | 'teamColor'> & {
  logoImageUrl: string | File;
  teamPlayers: TeamPlayerType[];
};

export const postTeams = (request: TeamFormType) => {
  return fetcher.post<void>('teams', { json: request });
};

export const useCreateTeams = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postTeams,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.teams._def });
    },
  });
};
