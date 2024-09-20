import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: string;
};

const deleteLeague = ({ leagueId }: Request) => {
  return fetcher.delete<void>(`/leagues/${leagueId}`);
};

const useDeleteLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLeague,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.leagues());
      await queryClient.invalidateQueries(queryKeys.league(variables.leagueId));
    },
  });
};

export default useDeleteLeague;
