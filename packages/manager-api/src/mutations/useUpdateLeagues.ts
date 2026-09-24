import { useMutation, useQueryClient } from '@hcc/api-base';

import type { LeagueDetailType } from '../types';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: number;
} & Pick<LeagueDetailType, 'name' | 'maxRound' | 'startAt' | 'endAt' | 'thirdPlaceMatchEnabled'>;

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
