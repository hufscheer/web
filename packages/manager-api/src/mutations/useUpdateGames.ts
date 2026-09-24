import { useMutation, useQueryClient } from '@hcc/api-base';

import type { GameQuarterType, GameStateType } from '../types';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

export type GameUpdateFormType = {
  leagueId: number;
  gameId: number;
  name: string;
  round: number;
  thirdPlaceMatch: boolean;
  quarter: GameQuarterType['key'];
  state: GameStateType;
  startTime: string;
  videoId: string;
};

export const putGames = ({ leagueId, gameId, ...request }: GameUpdateFormType) => {
  return fetcher.put<void>(`leagues/${leagueId}/${gameId}`, { json: request });
};

export const useUpdateGames = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: putGames,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.leagues._def }),
        qc.invalidateQueries({ queryKey: queryKeys.games._def }),
      ]);
    },
  });
};
