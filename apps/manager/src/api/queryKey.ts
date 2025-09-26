import { fetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type {
  GameListPayload,
  GameListResponse,
  LeagueDetailPayload,
  CheerTalkPayload,
  CheerTalkType,
  LeagueDetailType,
  LeagueType,
  PlayerDetailPayload,
  PlayerType,
  TeamType,
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
  detail: (payload: LeagueDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueDetailType>(`leagues/${payload.leagueId}`),
  }),
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

const gameQueryKeys = createQueryKeys('games', {
  list: (payload: GameListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameListResponse[]>('games', { searchParams: payload }),
  }),
});

const cheerTalkQueryKeys = createQueryKeys('cheertalks', {
  list: (payload: CheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>('cheer-talks'),
  }),
  reported: (payload: CheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>('cheer-talks/reported'),
  }),
  blocked: (payload: CheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>('cheer-talks/blocked'),
  }),
});

export const queryKeys = mergeQueryKeys(
  leagueQueryKeys,
  playerQueryKeys,
  teamQueryKeys,
  cheerTalkQueryKeys,
  gameQueryKeys,
);
