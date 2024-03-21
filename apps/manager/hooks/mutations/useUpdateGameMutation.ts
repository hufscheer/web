import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateGame } from '@/api/game';
import { GAME_DETAIL_QUERY_KEY } from '@/hooks/queries/useGameDetailQuery';
import { GameUpdatePayload } from '@/types/game';

type GameUpdateMutationParams = {
  gameId: string;
  payload: GameUpdatePayload;
};

export default function useUpdateGameMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gameId, payload }: GameUpdateMutationParams) =>
      updateGame(gameId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GAME_DETAIL_QUERY_KEY] });
    },
  });
}
