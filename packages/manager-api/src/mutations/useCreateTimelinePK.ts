import { useMutation, useQueryClient } from '@hcc/api-base';

import type { PkType } from '../types';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

export const postTimelinePK = ({ gameId, ...request }: PkType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/pk`, {
    json: request,
  });
};

export const useCreateTimelinePK = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postTimelinePK,
    onSuccess: async () => {
      await Promise.all([
        qc.refetchQueries({ queryKey: queryKeys.games.timeline({ gameId }).queryKey, type: 'all' }),
        qc.refetchQueries({ queryKey: queryKeys.games.detail({ gameId }).queryKey, type: 'all' }),
      ]);
    },
  });
};
