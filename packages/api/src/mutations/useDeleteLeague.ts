import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: string;
};

const deleteLeague = ({ leagueId }: Request) => {
  return fetcher.delete<void>(`/leagues/${leagueId}`);
};

export const useDeleteLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLeague,
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
