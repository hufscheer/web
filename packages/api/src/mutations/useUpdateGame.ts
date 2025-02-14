import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { CreateGameType, stateMap, StateType } from '../types';

type Request = {
  leagueId: string;
  gameId: string;
} & Omit<CreateGameType, 'idOfTeam1' | 'idOfTeam2'>;

const putUpdateGame = (request: Request) => {
  const { leagueId, gameId, ...rest } = request;
  return fetcher.put<void>(`/leagues/${leagueId}/${gameId}`, { ...rest });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUpdateGame,
    onSuccess: async (_, variables) => {
      const { leagueId, gameId } = variables;
      const states: StateType[] = Object.keys(stateMap) as StateType[];

      await Promise.all([
        queryClient.invalidateQueries(queryKeys.gameLineup(gameId)),
        queryClient.invalidateQueries(queryKeys.gameLineupPlaying(gameId)),
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
