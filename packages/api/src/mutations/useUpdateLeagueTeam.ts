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
  return fetcher.put<void>(`/leagues/${leagueId}/teams/${teamId}`, {
    ...rest,
  });
};

const useUpdateLeagueTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateLeagueTeam,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.leagueTeam(variables.teamId).queryKey,
          queryKeys.leagueTeams(variables.leagueId).queryKey,
        ],
      });
    },
  });
};

export default useUpdateLeagueTeam;
