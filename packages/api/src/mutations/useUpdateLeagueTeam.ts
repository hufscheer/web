import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { TeamUpdateType } from '../types';

type Request = TeamUpdateType & {
  leagueId: string;
  teamId: string;
};

const postUpdateLeagueTeam = (request: Request) => {
  const { leagueId, teamId, ...rest } = request;
  return fetcher.post<void>(`/leagues/${leagueId}/teams/${teamId}`, {
    ...rest,
  });
};

const useUpdateLeagueTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUpdateLeagueTeam,
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
