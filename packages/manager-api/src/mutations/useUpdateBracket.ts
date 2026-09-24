import { useMutation, useQueryClient } from '@hcc/api-base';

import type { BracketEntryType } from '../types';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: number;
  size: number;
  entries: BracketEntryType[];
};

export const putBracket = ({ leagueId, ...request }: Request) => {
  return fetcher.put<void>(`leagues/${leagueId}/bracket`, { json: request });
};

export const useUpdateBracket = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: putBracket,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.leagues._def });
    },
  });
};
