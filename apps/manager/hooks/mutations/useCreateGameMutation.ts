import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createGame } from '@/api/game';
import { GameCreatePayload } from '@/types/game';

import { GAME_QUERY_KEY } from '../queries/useGameQuery';

type Params = {
  leagueId: string;
  payload: GameCreatePayload;
};

export default function useCreateGameMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ leagueId, payload }: Params) =>
      createGame(leagueId, payload),
    onSuccess: (_, variables) =>
      queryClient.refetchQueries({
        queryKey: [
          GAME_QUERY_KEY,
          { state: 'scheduled', leagueId: Number(variables.leagueId) },
        ],
      }),
  });
}
