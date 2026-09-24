import { useMutation, useQueryClient } from '@hcc/api-base';

import type { TeamType } from '../types';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

export type TeamFormType = Pick<
  TeamType,
  'name' | 'unit' | 'teamColor' | 'teamPlayers' | 'sportType'
> & {
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
