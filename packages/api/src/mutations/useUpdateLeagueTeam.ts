import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { TeamUpdateType } from '../types';

type Request = TeamUpdateType & {
  leagueId: string;
  teamId: string;
};

const putUpdateLeagueTeam = (request: Request) => {
  const { leagueId, teamId, ...rest } = request;
  return fetcher.patch<void>(`/leagues/${leagueId}/teams/${teamId}`, {
    ...rest,
  });
};

const useUpdateLeagueTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateLeagueTeam,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.leagueTeam(variables.teamId)),
        queryClient.invalidateQueries(
          queryKeys.leagueTeams(variables.leagueId),
        ),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
      ]);
    },
  });
};

export default useUpdateLeagueTeam;
