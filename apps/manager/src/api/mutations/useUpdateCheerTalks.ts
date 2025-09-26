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
const useCheerTalkInvalidator = () => {
  const qc = useQueryClient();

  return () => {
    qc.invalidateQueries({ queryKey: queryKeys['cheer-talks'].list._def });
    qc.invalidateQueries({ queryKey: queryKeys['cheer-talks'].reported._def });
    qc.invalidateQueries({ queryKey: queryKeys['cheer-talks'].blocked._def });
  };
};

export const useBlockCheerTalk = () => {
  const invalidateCheerTalkQueries = useCheerTalkInvalidator();

  return useMutation({
    mutationFn: blockCheerTalk,
    // 2. 추출한 함수를 onSuccess 콜백으로 사용합니다.
    onSuccess: invalidateCheerTalkQueries,
  });
};

export const useUnblockCheerTalk = () => {
  const invalidateCheerTalkQueries = useCheerTalkInvalidator();

  return useMutation({
    mutationFn: unblockCheerTalk,
    // 2. 추출한 함수를 onSuccess 콜백으로 사용합니다.
    onSuccess: invalidateCheerTalkQueries,
  });
};
