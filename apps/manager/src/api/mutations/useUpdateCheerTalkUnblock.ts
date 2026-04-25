import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher, queryKeys } from '~/api/queryKey';

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
    onSuccess: async (_data, { leagueId, gameId }) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.cheertalks._def }),
        qc.invalidateQueries({ queryKey: ['leagues', leagueId, 'cheer-talks'] }),
        ...(gameId ? [qc.invalidateQueries({ queryKey: ['games', gameId, 'cheer-talks'] })] : []),
      ]);
    },
  });
};
