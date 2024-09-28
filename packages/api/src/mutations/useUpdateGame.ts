import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { CreateGameType } from '../types';

type Request = {
  leagueId: string;
  gameId: string;
} & Omit<CreateGameType, 'idOfTeam1' | 'idOfTeam2'>;

const putUpdateGame = (request: Request) => {
  const { leagueId, gameId, ...rest } = request;
  return fetcher.put<void>(`/leagues/${leagueId}/${gameId}`, { ...rest });
};

const useUpdateCandidateLineup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateGame,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(queryKeys.lineup(variables.gameId));
      await queryClient.invalidateQueries(
        queryKeys.lineupPlaying(variables.gameId),
      );
    },
  });
};

export default useUpdateCandidateLineup;
