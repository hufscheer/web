import { fetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type { LeagueDetailType, LeagueType } from './types';

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

export const queryKeys = mergeQueryKeys(leagueQueryKeys);
