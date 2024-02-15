import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCheer } from '@/api/game';

export default function useCheerMutation({
  gameTeamId,
  gameId,
}: {
  gameTeamId: number;
  gameId: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cheer'],
    mutationFn: (cheerCount: number) =>
      postCheer({ gameId: gameId, gameTeamId, cheerCount }),
    onMutate: async () => {
      const previousCount = queryClient.getQueryData(['game-cheer', gameId]);

      return { previousCount };
    },
    retry: false,
  });
}
