import { getFetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

import type {
  OrganizationType,
  TimelinePayload,
  TimelineType,
  CheerTalkPayload,
  CheerTalkType,
  GameCheerPayload,
  GameCheerType,
  GameDetailPayload,
  GameLineupPayload,
  GameLineupPlayingType,
  GameLineupType,
  GameListPayload,
  GameListResponse,
  GameQuarterScoresType,
  GameSearchPayload,
  GameType,
  GameVideoPayload,
  GameVideoType,
  LeagueCheerCountPayload,
  LeagueCheerCountType,
  LeagueDetailPayload,
  LeagueDetailType,
  LeagueListPayload,
  LeagueRecentSummaryPayload,
  LeagueRecentSummaryType,
  LeagueStatisticsPayload,
  LeagueStatisticsType,
  LeagueTeamsPayload,
  LeagueTeamType,
  LeagueTopScorersPayload,
  LeagueTopScorersType,
  LeagueType,
  SportType,
  TeamDetailPayload,
  TeamDetailType,
  TeamGamesPayload,
  TeamListPayload,
  TeamPlayerType,
  TeamSummaryType,
  TeamType,
  TeamUnitAvailabilityType,
  TeamUnitsPayload,
} from './types';

const apiBaseUrl = process.env.API_BASE_URL ?? '/api';
export const fetcher = getFetcher(apiBaseUrl);

const gameQueryKeys = createQueryKeys('games', {
  list: (payload: GameListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameListResponse[]>('games', { searchParams: payload }),
  }),
  detail: (payload: GameDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameType>(`games/${payload.gameId}`),
  }),
  search: (payload: GameSearchPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<GameType[]>('games/search', {
        searchParams: payload,
      }),
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
    queryFn: () => fetcher.get<GameLineupPlayingType[]>(`games/${payload.gameId}/lineup/playing`),
  }),
  video: (payload: GameVideoPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameVideoType>(`games/${payload.gameId}/video`),
  }),
  timeline: (payload: TimelinePayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TimelineType[]>(`games/${payload.gameId}/timeline`),
  }),
  cheertalk: (payload: CheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const cursor = pageParam > 0 ? pageParam : '';
      return fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks`, {
        searchParams: { cursor, size: 20 },
      });
    },
  }),
  quarterScores: (payload: GameDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameQuarterScoresType>(`games/${payload.gameId}/quarter-scores`),
  }),
});

const teamQueryKeys = createQueryKeys('teams', {
  list: (payload: TeamListPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const params = new URLSearchParams();

      if (payload.units) {
        const units = Array.isArray(payload.units) ? payload.units : [payload.units];
        units.forEach((u) => params.append('units', u));
      }

      if (payload.sportType) params.append('sportType', payload.sportType);

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
  players: (payload: TeamDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TeamPlayerType[]>(`teams/${payload.id}/players`),
  }),
  summary: (payload: TeamListPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const params = new URLSearchParams();

      if (payload.units) {
        const units = Array.isArray(payload.units) ? payload.units : [payload.units];
        units.forEach((u) => params.append('units', u));
      }

      if (payload.sportType) params.append('sportType', payload.sportType);

      return fetcher.get<TeamSummaryType[]>('teams/summary', {
        searchParams: params,
      });
    },
  }),
  units: (payload: TeamUnitsPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<TeamUnitAvailabilityType[]>('teams/units', { searchParams: payload }),
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
  recentGames: (payload?: { sportType?: SportType; organizationId?: number }) => ({
    queryKey: ['recent-games', payload],
    queryFn: () =>
      fetcher.get<GameListResponse[]>(`leagues/recent/games`, { searchParams: payload }),
  }),
  recentSummary: (payload?: LeagueRecentSummaryPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<LeagueRecentSummaryType>('leagues/recent-summary', { searchParams: payload }),
  }),
  cheerTalks: (payload: LeagueCheerCountPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueCheerCountType>(`leagues/${payload.leagueId}/cheer-count`),
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

const organizationQueryKeys = createQueryKeys('organizations', {
  list: {
    queryKey: null,
    queryFn: () => fetcher.get<OrganizationType[]>('organizations'),
  },
});

export const queryKeys = mergeQueryKeys(
  gameQueryKeys,
  teamQueryKeys,
  leagueQueryKeys,
  organizationQueryKeys,
);
