import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import type { LeagueDetailType } from '~/api';

import { queryKeys } from '~/api/queryKey';

type Request = {
  leagueId: number;
} & Pick<LeagueDetailType, 'name' | 'maxRound' | 'startAt' | 'endAt'>;

export const putLeagues = ({ leagueId, ...request }: Request) => {
  return fetcher.put<void>(`leagues/${leagueId}`, { json: request });
};

export const useUpdateLeagues = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: putLeagues,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.leagues._def });
    },
  });
};
