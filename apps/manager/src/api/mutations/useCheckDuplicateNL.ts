import { useMutation } from '@hcc/api-base';

import type { CheckDuplicateNLResponse, ParseNLPreview } from '~/api/types/nl';

import { fetcher } from '~/api/queryKey';

const postCheckDuplicateNL = (payload: ParseNLPreview) => {
  return fetcher.post<CheckDuplicateNLResponse>(`nl/check-duplicates`, { json: payload });
};

export const useCheckDuplicateNL = () => {
  return useMutation({
    mutationFn: postCheckDuplicateNL,
  });
};
