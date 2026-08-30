import { useMutation, useQueryClient } from '@hcc/api-base';

import type { WarningType } from '~/api';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

export const postTimelineWarning = ({ gameId, ...request }: WarningType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/warning-card`, {
    json: request,
  });
};

export const useCreateTimelinesWarning = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postTimelineWarning,
    onSuccess: async () => {
      await qc.refetchQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
        type: 'all',
      });
    },
  });
};
