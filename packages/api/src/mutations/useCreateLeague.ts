import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { LeagueCreateType } from '../types';

type Request = LeagueCreateType;

const postCreateLeague = (request: Request) => {
  return fetcher.post<void>(`/leagues`, { ...request });
};

export const useCreateLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateLeague,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.leagues()),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
      ]);
    },
  });
};
