import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { TeamCreateType } from '../types';

type Request = TeamCreateType & {
  leagueId: string;
};

const postCreateLeagueTeam = (request: Request) => {
  const { leagueId, ...rest } = request;
  return fetcher.post<void>(`/leagues/${leagueId}/teams`, {
    ...rest,
  });
};

const useCreateLeagueTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateLeagueTeam,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(
        queryKeys.leagueTeams(variables.leagueId),
      );
    },
  });
};

export default useCreateLeagueTeam;
