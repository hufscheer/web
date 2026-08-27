import { useMutation, useQueryClient } from '@hcc/api-base';

import type { LeagueDetailType } from '~/api';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

type Request = {
  leagueId: number;
} & Pick<LeagueDetailType, 'teamIds'>;

export const postLeagueTeams = ({ leagueId, ...request }: Request) => {
  return fetcher.post<void>(`leagues/${leagueId}/teams`, { json: request });
};

export const useUpdateLeagueTeams = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postLeagueTeams,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.leagues._def });
    },
  });
};
