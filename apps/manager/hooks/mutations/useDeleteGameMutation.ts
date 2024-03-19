import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteGame } from '@/api/game';

export default function useDeleteGameMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delete-game'] });
    },
  });
}
