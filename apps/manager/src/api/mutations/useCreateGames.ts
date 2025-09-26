import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import type { GameStateType } from '~/api';
import { queryKeys } from '~/api/queryKey';

export type GameFormTeamType = {
  teamId: number;
  lineupPlayers: {
    teamPlayerId: number;
    state: 'STARTER' | 'CANDIDATE';
    isCaptain: boolean;
  }[];
};

export type GameFormType = {
  leagueId: number;
  name: string;
  round: number;
  quarter: string;
  state: GameStateType;
  startTime: string;
  videoId: string;
  team1: GameFormTeamType;
  team2: GameFormTeamType;
};

export const postGames = ({ leagueId, ...request }: GameFormType) => {
  return fetcher.post<void>(`leagues/${leagueId}/games`, { json: request });
};

export const useCreateGames = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postGames,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.leagues._def }),
        qc.invalidateQueries({ queryKey: queryKeys.games._def }),
      ]);
    },
  });
};
