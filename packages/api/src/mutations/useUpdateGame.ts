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

const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateGame,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.lineup(variables.gameId)),
        queryClient.invalidateQueries(
          queryKeys.lineupPlaying(variables.gameId),
        ),
        queryClient.invalidateQueries(queryKeys.game(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
      ]);
    },
  });
};

export default useUpdateGame;
