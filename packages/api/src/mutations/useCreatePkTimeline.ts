import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { PkCreateType } from '../types';

type Request = PkCreateType & {
  gameId: string;
};

const postCreatePkTimeline = (request: Request) => {
  const { gameId, ...rest } = request;
  return fetcher.post<void>(`/games/${gameId}/timelines/pk`, {
    ...rest,
  });
};

const useCreatePkTimeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreatePkTimeline,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.timeline(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.game(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
      ]);
    },
  });
};

export default useCreatePkTimeline;
