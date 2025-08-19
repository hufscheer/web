import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import type { PlayerType } from '~/api';
import { queryKeys } from '~/api/queryKey';

export type PlayerFormType = Pick<PlayerType, 'name' | 'studentNumber'>;

export const postPlayers = (request: PlayerFormType) => {
  return fetcher.post<void>('players', { json: request });
};

export const useCreatePlayers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPlayers,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.players._def });
    },
  });
};
