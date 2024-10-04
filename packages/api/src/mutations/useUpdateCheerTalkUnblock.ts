import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: string;
  cheerTalkId: string | number;
};

const patchCheerTalkUnblock = ({ leagueId, cheerTalkId }: Request) => {
  return fetcher.patch<void>(`/cheer-talks/${leagueId}/${cheerTalkId}/unblock`);
};

const useUpdateCheerTalkUnblock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchCheerTalkUnblock,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(
          queryKeys.leagueCheerTalks({ leagueId: variables.leagueId }),
        ),
        queryClient.invalidateQueries(
          queryKeys.leagueCheerTalksBlocked({ leagueId: variables.leagueId }),
        ),
        queryClient.invalidateQueries(
          queryKeys.leagueCheerTalksReported({ leagueId: variables.leagueId }),
        ),
      ]);
    },
  });
};

export default useUpdateCheerTalkUnblock;
