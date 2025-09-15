import { fetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import type {
  GameCheerPayload,
  GameCheerType,
  GameDetailPayload,
  GameLineupPayload,
  GameLineupType,
  GameListPayload,
  GameListResponse,
  GameType,
  LeagueDetailPayload,
  LeagueDetailType,
  LeagueListPayload,
  LeagueStatisticsPayload,
  LeagueStatisticsType,
  LeagueTeamsPayload,
  LeagueTeamType,
  LeagueTopScorersPayload,
  LeagueTopScorersType,
  LeagueType,
  TeamDetailPayload,
  TeamDetailType,
  TeamGamesPayload,
  TeamListPayload,
  TeamType,
} from './types';

const gameQueryKeys = createQueryKeys('games', {
  list: (payload: GameListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameListResponse[]>('games', { searchParams: payload }),
  }),
  detail: (payload: GameDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameType>(`games/${payload.gameId}`),
  }),
  cheer: (payload: GameCheerPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameCheerType[]>(`games/${payload.gameId}/cheer`),
  }),
  lineup: (payload: GameLineupPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameLineupType[]>(`games/${payload.gameId}/lineup`),
  }),
  lineupPlaying: (payload: GameLineupPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameLineupType[]>(`games/${payload.gameId}/lineup/playing`),
  }),
});

const teamQueryKeys = createQueryKeys('teams', {
  list: (payload: TeamListPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const params = new URLSearchParams();

      if (payload.units) {
        const units = Array.isArray(payload.units) ? payload.units : [payload.units];
        units.forEach(u => params.append('units', u));
      }

      return fetcher.get<TeamType[]>('teams', { searchParams: params });
    },
  }),
  detail: (payload: TeamDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TeamDetailType>(`teams/${payload.id}`),
  }),
  games: (payload: TeamGamesPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameType[]>(`teams/${payload.id}/games`),
  }),
});

const leagueQueryKeys = createQueryKeys('leagues', {
  list: (payload: LeagueListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueType[]>('leagues', { searchParams: payload }),
  }),
  detail: (payload: LeagueDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueDetailType>(`leagues/${payload.leagueId}`),
  }),
  statistics: (payload: LeagueStatisticsPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueStatisticsType>(`leagues/${payload.leagueId}/statistics`),
  }),
  topScorers: (payload: LeagueTopScorersPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueTopScorersType[]>(`leagues/${payload.leagueId}/top-scorers`),
  }),
  teams: (payload: LeagueTeamsPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<LeagueTeamType[]>(`leagues/${payload.leagueId}/teams`, {
        searchParams: { round: payload.round },
      }),
  }),
});

export const queryKeys = mergeQueryKeys(gameQueryKeys, teamQueryKeys, leagueQueryKeys);
