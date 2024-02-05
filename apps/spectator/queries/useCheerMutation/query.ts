import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCheer } from '@/api/match';

export default function useCheerMutation({
  gameTeamId,
  matchId,
}: {
  gameTeamId: number;
  matchId: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cheer'],
    mutationFn: (cheerCount: number) =>
      postCheer({ matchId, gameTeamId, cheerCount }),
    onMutate: async () => {
      const previousCount = queryClient.getQueryData(['match-cheer', matchId]);

      return { previousCount };
    },
    retry: false,
  });
}
