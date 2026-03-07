import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import type { LeagueDetailType } from '~/api';

import { queryKeys } from '~/api/queryKey';

export type LeagueFormType = Pick<
  LeagueDetailType,
  'name' | 'maxRound' | 'startAt' | 'endAt' | 'teamIds'
>;

export const postLeagues = (request: LeagueFormType) => {
  return fetcher.post<void>('leagues', { json: request });
};

export const useCreateLeagues = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postLeagues,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.leagues._def });
    },
  });
};
