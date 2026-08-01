import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher } from '~/api/fetcher';
import { queryKeys } from '~/api/queryKey';

type Request = {
  leagueId: number;
  cheerTalkId: number;
  gameId?: number;
};

const patchCheerTalkUnblock = ({ leagueId, cheerTalkId }: Request) => {
  return fetcher.patch<void>(`cheer-talks/${leagueId}/${cheerTalkId}/unblock`);
};

export const useUpdateCheerTalkUnblock = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchCheerTalkUnblock,
    onSuccess: async (_data, { gameId }) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.cheertalks._def }),
        qc.invalidateQueries({ queryKey: queryKeys.leagues.cheerTalksBlocked._def }),
        ...(gameId
          ? [qc.invalidateQueries({ queryKey: queryKeys.games.cheerTalksBlocked._def })]
          : []),
      ]);
    },
  });
};
