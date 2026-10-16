import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import { HTTPError } from 'ky';

import type {
  BracketType,
  CheerTalkListResponse,
  CheerTalkPayload,
  CheerTalkType,
  GameCheerTalkPayload,
  GameDetailPayload,
  GameDetailType,
  LeagueCheerTalkPayload,
  GameLineupPayload,
  GameLineupPlayingType,
  GameLineupType,
  GameListPayload,
  GamesListPageResponse,
  LeagueDetailPayload,
  LeagueCheerCountType,
  LeagueDetailType,
  LeagueListItemType,
  LeagueStatisticsType,
  LeagueTeamsPayload,
  LeagueTeamsPlayersPayload,
  LeagueTeamsPlayerType,
  LeagueTeamType,
  LeagueTopScorerType,
  LeagueType,
  MemberInfoType,
  PlayerDetailPayload,
  PlayerListPayload,
  PlayerListResponse,
  PlayerSearchPayload,
  PlayerType,
  ProgressAvailableActionsResponse,
  QuarterScoreType,
  TeamDetailType,
  TeamType,
  TeamUnitType,
  TimelinePayload,
  TimelineResponseType,
} from './types';

import { fetcher } from './fetcher';

const nullIfNotFound = async <T>(request: Promise<T>) => {
  try {
    return await request;
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 404) return null;
    throw error;
  }
};

const leagueQueryKeys = createQueryKeys('leagues', {
  list: {
    queryKey: null,
    queryFn: () => fetcher.get<LeagueListItemType[]>('leagues'),
  },
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
  bracket: (payload: LeagueDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => nullIfNotFound(fetcher.get<BracketType>(`leagues/${payload.leagueId}/bracket`)),
  }),
  statistics: (payload: LeagueDetailPayload) => ({
    queryKey: [payload],
    queryFn: () =>
      nullIfNotFound(fetcher.get<LeagueStatisticsType>(`leagues/${payload.leagueId}/statistics`)),
  }),
  topScorers: (payload: LeagueDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueTopScorerType[]>(`leagues/${payload.leagueId}/top-scorers`),
  }),
  cheerCount: (payload: LeagueDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<LeagueCheerCountType>(`leagues/${payload.leagueId}/cheer-count`),
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
  search: (payload: PlayerSearchPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<PlayerListResponse>('players', { searchParams: payload }),
  }),
});

const teamQueryKeys = createQueryKeys('teams', {
  list: {
    queryKey: null,
    queryFn: () => fetcher.get<TeamType[]>('teams'),
  },
  detail: (payload: { id: number }) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TeamDetailType>(`teams/${payload.id}`),
  }),
  teamplayers: (payload: { id: number }) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<PlayerType[]>(`teams/${payload.id}/players`),
  }),
  manager: {
    queryKey: null,
    queryFn: () => fetcher.get<TeamType[]>('manager/teams'),
  },
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

const MAX_GAME_PAGES = 20;

const fetchAllGames = async (payload: Omit<GameListPayload, 'cursor'>) => {
  const content: GamesListPageResponse['content'] = [];
  let cursor: number | null = null;

  for (let page = 0; page < MAX_GAME_PAGES; page += 1) {
    const response: GamesListPageResponse = await fetcher.get<GamesListPageResponse>('games', {
      searchParams: cursor === null ? payload : { ...payload, cursor },
    });
    content.push(...response.content);
    if (!response.hasNext || response.nextCursor === null) break;
    cursor = response.nextCursor;
  }

  return { content, nextCursor: null, hasNext: false } satisfies GamesListPageResponse;
};

const gameQueryKeys = createQueryKeys('games', {
  list: (payload: GameListPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GamesListPageResponse>('games', { searchParams: payload }),
  }),
  /** 커서를 끝까지 따라가 모든 페이지를 모은다. 학교 전체 목록을 걸러 쓸 때 잘리지 않게 한다 */
  listAll: (payload: Omit<GameListPayload, 'cursor'>) => ({
    queryKey: [payload],
    queryFn: () => fetchAllGames(payload),
  }),
  timeline: (payload: TimelinePayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<TimelineResponseType>(`games/${payload.gameId}/timeline`),
  }),
  detail: (payload: GameDetailPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameDetailType>(`games/${payload.gameId}`),
  }),
  lineup: (payload: GameLineupPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameLineupType[]>(`games/${payload.gameId}/lineup`),
  }),
  lineupPlaying: (payload: GameLineupPayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<GameLineupPlayingType[]>(`games/${payload.gameId}/lineup/playing`),
  }),
  quarterScores: (payload: TimelinePayload) => ({
    queryKey: [payload],
    queryFn: () => fetcher.get<QuarterScoreType[]>(`games/${payload.gameId}/quarter-scores`),
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

const memberQueryKeys = createQueryKeys('members', {
  info: {
    queryKey: null,
    queryFn: () => fetcher.get<MemberInfoType>('members/info'),
  },
});

export const queryKeys = mergeQueryKeys(
  leagueQueryKeys,
  playerQueryKeys,
  teamQueryKeys,
  cheerTalkQueryKeys,
  gameQueryKeys,
  memberQueryKeys,
);
