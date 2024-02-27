import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCheer } from '@/api/game';
import { GameCheerType } from '@/types/game';

type CheerMutationOptions = {
  gameTeamId: number;
  gameId: string;
  cheerCount: number;
};

export default function useCheerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CheerMutationOptions) => postCheer(params),
    onMutate: async ({ gameId, gameTeamId, cheerCount }) => {
      // 이전 데이터를 가져옴
      const previousData = queryClient.getQueryData(['game-cheer', gameId]) as
        | GameCheerType[]
        | null;

      // 요청 취소
      await queryClient.cancelQueries({ queryKey: ['game-cheer', gameId] });

      // 데이터 업데이트
      if (previousData) {
        const updatedData = previousData.map(item => {
          if (item.gameTeamId === gameTeamId) {
            return {
              ...item,
              cheerCount: item.cheerCount + cheerCount,
            };
          }

          return item;
        });

        queryClient.setQueryData(['game-cheer', gameId], updatedData);
      }

      return { previousData };
    },
    onError: (err, variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          ['game-cheer', variables.gameId],
          context.previousData,
        );
      }
    },
    onSettled: (data, error, variables) => {
      // 쿼리 갱신
      queryClient.invalidateQueries({
        queryKey: ['game-cheer', variables.gameId],
      });
    },
    retry: 1,
  });
}
