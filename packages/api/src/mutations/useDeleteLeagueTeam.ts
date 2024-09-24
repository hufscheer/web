import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: string;
  teamId: string;
};

const deleteLeagueTeam = ({ leagueId, teamId }: Request) =>
  fetcher.delete<void>(`/leagues/${leagueId}/teams/${teamId}`);

const useDeleteLeagueTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLeagueTeam,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(
        queryKeys.leagueTeam(variables.teamId),
      );
      await queryClient.invalidateQueries(
        queryKeys.leagueTeams(variables.leagueId),
      );
    },
  });
};

export default useDeleteLeagueTeam;