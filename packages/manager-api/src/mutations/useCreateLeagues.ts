import { useMutation, useQueryClient } from '@hcc/api-base';

import type { LeagueDetailType } from '../types';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

export type LeagueFormType = Pick<
  LeagueDetailType,
  | 'name'
  | 'maxRound'
  | 'startAt'
  | 'endAt'
  | 'teamIds'
  | 'sportType'
  | 'bracketEnabled'
  | 'thirdPlaceMatchEnabled'
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
