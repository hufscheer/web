import { useMutation, useQueryClient } from '@hcc/api-base';

import type { CheckDuplicateNLResponse, ParseNLPreview } from '~/api/types/nl';

import { fetcher, queryKeys } from '~/api/queryKey';

const postCheckDuplicateNL = (payload: ParseNLPreview) => {
  return fetcher.post<CheckDuplicateNLResponse>(`nl/check-duplicates`, { json: payload });
};

export const useCheckDuplicateNL = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postCheckDuplicateNL,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.teams._def });
    },
  });
};
