import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

type Request = {
  leagueId: string;
  gameId: string;
};

const deleteGame = ({ leagueId, gameId }: Request) => {
  return fetcher.delete<void>(`/leagues/${leagueId}/${gameId}`);
};

const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGame,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.league(variables.leagueId)),
        queryClient.invalidateQueries(queryKeys.game(variables.gameId)),
        queryClient.invalidateQueries(queryKeys.leaguesOnManager()),
        queryClient.invalidateQueries(queryKeys.leaguesManageOnManager()),
      ]);
    },
  });
};

export default useDeleteGame;
