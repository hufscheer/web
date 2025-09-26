import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import { queryKeys } from '~/api/queryKey';

type Request = {
  leagueId: number;
  cheerTalkId: number;
};

const blockCheerTalk = ({ leagueId, cheerTalkId }: Request) => {
  return fetcher.patch<void>(`cheer-talks/${leagueId}/${cheerTalkId}/block`);
};

const unblockCheerTalk = ({ leagueId, cheerTalkId }: Request) => {
  return fetcher.patch<void>(`cheer-talks/${leagueId}/${cheerTalkId}/unblock`);
};

export const useBlockCheerTalk = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: blockCheerTalk,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys['cheer-talks']._def });
    },
  });
};

export const useUnblockCheerTalk = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: unblockCheerTalk,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys['cheer-talks']._def });
    },
  });
};
