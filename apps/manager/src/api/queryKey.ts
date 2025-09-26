import { fetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type {
  LeagueDetailType,
  LeagueType,
  PlayerDetailPayload,
  PlayerType,
  TeamType,
  CheerTalkType,
  CheerTalkPayload,
} from './types';

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

const teamQueryKeys = createQueryKeys('teams', {
  list: {
    queryKey: null,
    queryFn: () => fetcher.get<TeamType[]>('teams'),
  },
  detail: (payload: { id: number }) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TeamType>(`teams/${payload.id}`),
  }),
});

const cheerTalkQueryKeys = createQueryKeys('cheer-talks', {
  list: (params: CheerTalkPayload) => ({
    queryKey: [{ scope: 'list', ...params }],
    queryFn: () => fetcher.get<CheerTalkType[]>('cheer-talks'),
  }),
  reported: (params: CheerTalkPayload) => ({
    queryKey: [{ scope: 'reported', ...params }],
    queryFn: () => fetcher.get<CheerTalkType[]>('cheer-talks/reported'),
  }),
  blocked: (params: CheerTalkPayload) => ({
    queryKey: [{ scope: 'blocked', ...params }],
    queryFn: () => fetcher.get<CheerTalkType[]>('cheer-talks/blocked'),
  }),
});

export const queryKeys = mergeQueryKeys(
  leagueQueryKeys,
  playerQueryKeys,
  teamQueryKeys,
  cheerTalkQueryKeys,
);
