import { useMutation } from '@tanstack/react-query';

import { createGame } from '@/api/game';
import { GameCreatePayload } from '@/types/game';

type Params = {
  leagueId: string;
  payload: GameCreatePayload;
};

export default function useCreateGameMutation() {
  return useMutation({
    mutationFn: ({ leagueId, payload }: Params) =>
      createGame(leagueId, payload),
  });
}