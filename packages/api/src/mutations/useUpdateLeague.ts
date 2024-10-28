import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { LeagueUpdateType } from '../types';

type Request = LeagueUpdateType & {
  leagueId: string;
};

const putUpdateLeague = (request: Request) => {
  const { leagueId, ...rest } = request;
  return fetcher.put<void>(`/leagues/${leagueId}`, { ...rest });
};

const useUpdateLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateLeague,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.leagues()),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
        queryClient.invalidateQueries(queryKeys.league(variables.leagueId)),
      ]);
    },
  });
};

export default useUpdateLeague;
