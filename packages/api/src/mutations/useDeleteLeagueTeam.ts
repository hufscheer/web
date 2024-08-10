import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: string;
};

const deleteCreateLeagueTeam = ({ leagueId }: Request) =>
  fetcher.delete<void>(`/leagues/${leagueId}/teams`);

const useDeleteLeagueTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCreateLeagueTeam,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.leagueTeams(variables.leagueId).queryKey,
      });
    },
  });
};

export default useDeleteLeagueTeam;
