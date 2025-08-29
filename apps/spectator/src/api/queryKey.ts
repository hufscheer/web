import { fetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type { GameListPayload, GameType, TeamListPayload, TeamType } from './types';

const gameQueryKeys = createQueryKeys('games', {
  list: (payload: GameListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameType[]>('games', { searchParams: payload }),
  }),
});

const teamQueryKeys = createQueryKeys('teams', {
  list: (payload: TeamListPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const params = new URLSearchParams();

      if (payload.units) {
        const units = Array.isArray(payload.units) ? payload.units : [payload.units];

        units.forEach(u => {
          params.append('units', u);
        });
      }

      return fetcher.get<TeamType[]>('teams', { searchParams: params });
    },
  }),
});

export const queryKeys = mergeQueryKeys(gameQueryKeys, teamQueryKeys);
