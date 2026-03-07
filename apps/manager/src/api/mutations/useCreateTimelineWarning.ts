import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';

import type { WarningType } from '~/api';

import { queryKeys } from '~/api/queryKey';

export const postTimelineWarning = ({ gameId, ...request }: WarningType) => {
  return fetcher.post<void>(`games/${gameId}/timelines/warning-card`, {
    json: request,
  });
};

export const useCreateTimelinesWarning = ({ gameId }: { gameId: number }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.games.timeline({ gameId }).queryKey,
    mutationFn: postTimelineWarning,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: queryKeys.games.timeline({ gameId }).queryKey,
      });
    },
  });
};
