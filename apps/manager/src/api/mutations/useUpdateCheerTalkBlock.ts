import { useMutation, useQueryClient } from '@hcc/api-base';

import { fetcher, queryKeys } from '~/api/queryKey';

type Request = {
  leagueId: number;
  cheerTalkId: number;
};

const patchCheerTalkBlock = ({ leagueId, cheerTalkId }: Request) => {
  return fetcher.patch<void>(`cheer-talks/${leagueId}/${cheerTalkId}/block`);
};

export const useUpdateCheerTalkBlock = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchCheerTalkBlock,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.cheertalks._def });
    },
  });
};
