import { fetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type { LeagueDetailType, LeagueType, PlayerDetailPayload, PlayerType } from './types';

const leagueQueryKeys = createQueryKeys('leagues', {
  home: {
    queryKey: null,
    queryFn: () => fetcher.get<LeagueType[]>('leagues/manager'),
  },
  league: {
    queryKey: null,
    queryFn: () => fetcher.get<LeagueDetailType[]>('leagues/manager/manage'),
  },
});

const playerQueryKeys = createQueryKeys('players', {
  list: {
    queryKey: null,
    queryFn: () => fetcher.get<PlayerType[]>('players'),
  },
  detail: (payload: PlayerDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<PlayerType>(`players/${payload.id}`),
  }),
});

export const queryKeys = mergeQueryKeys(leagueQueryKeys, playerQueryKeys);
