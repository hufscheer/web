import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { stateMap, StateType } from '../types';

type Request = {
  leagueId: string;
  gameId: string;
};

const deleteGame = ({ leagueId, gameId }: Request) => {
  return fetcher.delete<void>(`/leagues/${leagueId}/${gameId}`);
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGame,
    onSuccess: async (_, variables) => {
      const { leagueId, gameId } = variables;
      const states: StateType[] = Object.keys(stateMap) as StateType[];

      await Promise.all([
        queryClient.invalidateQueries(queryKeys.league(leagueId)),
        queryClient.invalidateQueries(queryKeys.game(gameId)),
        ...states.map((state: StateType) =>
          queryClient.invalidateQueries(
            queryKeys.games({ league_id: leagueId, state, size: 100 }),
          ),
        ),
      ]);
    },
  });
};
