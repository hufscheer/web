import { getFetcher } from '@hcc/api-base';
import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

import type {
  CheerTalkPayload,
  CheerTalkType,
  GameCheerTalkPayload,
  GameDetailPayload,
  LeagueCheerTalkPayload,
  GameLineupPayload,
  GameLineupPlayingType,
  GameLineupType,
  GameListPayload,
  GameListResponse,
  GameType,
  LeagueDetailPayload,
  LeagueDetailType,
  LeagueTeamsPayload,
  LeagueTeamsPlayersPayload,
  LeagueTeamsPlayerType,
  LeagueTeamType,
  LeagueType,
  PlayerDetailPayload,
  PlayerType,
  ProgressAvailableActionsResponse,
  TeamType,
  TimelinePayload,
  TimelineType,
} from './types';

const apiBaseUrl = process.env.API_BASE_URL ?? '/api';
export const fetcher = getFetcher(apiBaseUrl);

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
  teams: (payload: LeagueTeamsPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueTeamType[]>(`leagues/${payload.leagueId}/teams`),
  }),
  teamsPlayers: (payload: LeagueTeamsPlayersPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<LeagueTeamsPlayerType[]>(`leagues/teams/${payload.leagueTeamId}/players`),
  }),
  cheerTalks: (payload: LeagueCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks`),
  }),
  cheerTalksBlocked: (payload: LeagueCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks/blocked`),
  }),
  cheerTalksReported: (payload: LeagueCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks/reported`),
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
  teamplayers: (payload: { id: number }) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<PlayerType[]>(`teams/${payload.id}/players`),
  }),
});

const gameQueryKeys = createQueryKeys('games', {
  list: (payload: GameListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameListResponse[]>('games', { searchParams: payload }),
  }),
  timeline: (payload: TimelinePayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TimelineType[]>(`games/${payload.gameId}/timeline`),
  }),
  detail: (payload: GameDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameType>(`games/${payload.gameId}`),
  }),
  lineup: (payload: GameLineupPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameLineupType[]>(`games/${payload.gameId}/lineup`),
  }),
  lineupPlaying: (payload: GameLineupPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameLineupPlayingType[]>(`games/${payload.gameId}/lineup/playing`),
  }),
  progressAvailable: (payload: TimelinePayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<ProgressAvailableActionsResponse>(`games/${payload.gameId}/available-progress`),
  }),
  cheerTalks: (payload: GameCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks`),
  }),
  cheerTalksBlocked: (payload: GameCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks/blocked`),
  }),
  cheerTalksReported: (payload: GameCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks/reported`),
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
