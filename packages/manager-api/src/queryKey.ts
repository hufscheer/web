import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

import type {
  CheerTalkListResponse,
  CheerTalkPayload,
  CheerTalkType,
  GameCheerTalkPayload,
  GameDetailPayload,
  LeagueCheerTalkPayload,
  GameLineupPayload,
  GameLineupPlayingType,
  GameLineupType,
  GameListPayload,
  GamesListPageResponse,
  GameType,
  LeagueDetailPayload,
  LeagueDetailType,
  LeagueTeamsPayload,
  LeagueTeamsPlayersPayload,
  LeagueTeamsPlayerType,
  LeagueTeamType,
  LeagueType,
  PlayerDetailPayload,
  PlayerListPayload,
  PlayerListResponse,
  PlayerType,
  ProgressAvailableActionsResponse,
  TeamType,
  TeamUnitType,
  TimelinePayload,
  TimelineResponseType,
} from './types';

import { fetcher } from './fetcher';

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
    queryFn: () =>
      fetcher.get<LeagueTeamType[]>(`leagues/${payload.leagueId}/teams`, {
        searchParams: {
          round: payload.round,
          third_place_match: payload.thirdPlaceMatch,
        },
      }),
  }),
  teamsPlayers: (payload: LeagueTeamsPlayersPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<LeagueTeamsPlayerType[]>(`leagues/teams/${payload.leagueTeamId}/players`),
  }),
  cheerTalksBlocked: (payload: LeagueCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks/blocked`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  }),
  cheerTalksBlockedInfinite: ({ leagueId, size }: LeagueCheerTalkPayload) => ({
    queryKey: [{ leagueId, size }],
  }),
  cheerTalks: (payload: LeagueCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  }),
  cheerTalksInfinite: ({ leagueId, size }: LeagueCheerTalkPayload) => ({
    queryKey: [{ leagueId, size }],
  }),
  cheerTalksReported: (payload: LeagueCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`leagues/${payload.leagueId}/cheer-talks/reported`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  }),
  cheerTalksReportedInfinite: ({ leagueId, size }: LeagueCheerTalkPayload) => ({
    queryKey: [{ leagueId, size }],
  }),
});

const playerQueryKeys = createQueryKeys('players', {
  list: {
    queryKey: null,
    queryFn: () => fetcher.get<PlayerListResponse>('players'),
  },
  detail: (payload: PlayerDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<PlayerType>(`players/${payload.id}`),
  }),
  infinite: ({ name, studentNumber }: PlayerListPayload) => ({
    queryKey: [name, studentNumber],
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
  units: (payload: { sportType: string }) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TeamUnitType[]>('manager/teams/units', { searchParams: payload }),
  }),
  managerList: (payload: { units: string[]; sportType: string }) => ({
    queryKey: [payload],
    queryFn: () => {
      const params = new URLSearchParams({ sportType: payload.sportType });
      payload.units.forEach((unit) => params.append('units', unit));
      return fetcher.get<TeamType[]>('manager/teams', { searchParams: params });
    },
  }),
});

const gameQueryKeys = createQueryKeys('games', {
  list: (payload: GameListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GamesListPageResponse>('games', { searchParams: payload }),
  }),
  timeline: (payload: TimelinePayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TimelineResponseType>(`games/${payload.gameId}/timeline`),
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
  cheerTalksBlocked: (payload: GameCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks/blocked`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  }),
  cheerTalksBlockedInfinite: ({ gameId, size }: GameCheerTalkPayload) => ({
    queryKey: [{ gameId, size }],
  }),
  cheerTalksInfinite: ({ gameId, size }: GameCheerTalkPayload) => ({
    queryKey: [{ gameId, size }],
  }),
  cheerTalksReported: (payload: GameCheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>(`games/${payload.gameId}/cheer-talks/reported`, {
        searchParams: { cursor, size: payload.size },
      });
    },
  }),
  cheerTalksReportedInfinite: ({ gameId, size }: GameCheerTalkPayload) => ({
    queryKey: [{ gameId, size }],
  }),
});

const cheerTalkQueryKeys = createQueryKeys('cheertalks', {
  list: (payload: CheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<CheerTalkListResponse>('cheer-talks', {
        searchParams: { cursor: payload.cursor || '', size: payload.size },
      }),
  }),
  listInfinite: (size: number) => ({
    queryKey: [size],
  }),
  reported: (payload: CheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      fetcher.get<CheerTalkListResponse>('cheer-talks/reported', {
        searchParams: { cursor: payload.cursor || '', size: payload.size },
      }),
  }),
  reportedInfinite: (size: number) => ({
    queryKey: [size],
  }),
  blocked: (payload: CheerTalkPayload) => ({
    queryKey: [payload],
    queryFn: () => {
      const cursor = payload.cursor || '';
      return fetcher.get<CheerTalkType[]>('cheer-talks/blocked', {
        searchParams: { cursor, size: payload.size },
      });
    },
  }),
  blockedInfinite: (size: number) => ({
    queryKey: [size],
  }),
});

export const queryKeys = mergeQueryKeys(
  leagueQueryKeys,
  playerQueryKeys,
  teamQueryKeys,
  cheerTalkQueryKeys,
  gameQueryKeys,
);
