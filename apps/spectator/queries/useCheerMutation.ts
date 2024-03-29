import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCheer } from '@/api/game';

type CheerMutationOptions = {
  gameTeamId: number;
  gameId: string;
  cheerCount: number;
};

export default function useCheerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CheerMutationOptions) => postCheer(params),
    onSettled: (data, error, variables) => {
      // 쿼리 갱신
      queryClient.invalidateQueries({
        queryKey: ['game-cheer', variables.gameId],
      });
    },
    retry: 1,
  });
}
