import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import type { TeamType } from '~/api';
import { queryKeys } from '~/api/queryKey';

export type TeamFormType = Pick<TeamType, 'name' | 'unit' | 'teamColor' | 'teamPlayers'> & {
  logoImageUrl: string | File;
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
