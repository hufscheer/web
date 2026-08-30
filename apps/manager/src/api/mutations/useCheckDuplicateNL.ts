import { useMutation } from '@hcc/api-base';

import type { CheckDuplicateNLResponse, ParsedPlayer } from '~/api/types/nl';

import { fetcher } from '~/api/fetcher';

const postCheckDuplicateNL = (payload: { players: ParsedPlayer[] }) => {
  return fetcher.post<CheckDuplicateNLResponse>(`nl/check-duplicates`, { json: payload });
};

export const useCheckDuplicateNL = () => {
  return useMutation({
    mutationFn: postCheckDuplicateNL,
  });
};
