import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createLineup } from '@/api/game';
import { LineupPayload } from '@/types/game';

import { GAME_LINEUP_QUERY_KEY } from '../queries/useGameLineupQuery';

type Params = {
  teamId: string;
  payload: LineupPayload[];
};

export default function useCreateLineupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, payload }: Params) => createLineup(teamId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GAME_LINEUP_QUERY_KEY, { teamId: variables.teamId }],
      });
    },
  });
}
