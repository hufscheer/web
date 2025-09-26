import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import { queryKeys } from '~/api/queryKey';

type Request = {
  leagueId: number;
  cheerTalkId: number;
};

const patchCheerTalkUnBlock = ({ leagueId, cheerTalkId }: Request) => {
  return fetcher.patch<void>(`cheer-talks/${leagueId}/${cheerTalkId}/unblock`);
};

export const useUpdateCheerTalkUnBlock = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchCheerTalkUnBlock,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.cheertalks._def });
    },
  });
};
