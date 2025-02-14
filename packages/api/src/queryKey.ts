import { fetcher } from './fetcher';
import {
  GamesParams,
  GameType,
  GameWithLeagueListType,
  LeagueDetailType,
  LeagueListType,
  LeagueTeamType,
  LeagueType,
  StateType,
  TeamPlayerType,
  TeamDetailType,
  TeamType,
  LineupType,
  TimelineType,
  ManagerLeagueType,
  ManagerManageLeagueType,
  CheerTalkType,
  LeagueCheerTalkPayload,
  GameCheerTalkPayload,
  PlayingLineupType,
  GameCheerType,
} from './types';

const managerQueryKeys = {
  leaguesOnManager: () => ({
    queryKey: ['leaguesOnManager'],
    queryFn: () => fetcher.get<ManagerLeagueType[]>(`/leagues/manager`),
  }),

  leaguesManageOnManager: () => ({
    queryKey: ['leaguesManageOnManager'],
    queryFn: () =>
      fetcher.get<ManagerManageLeagueType[]>(`/leagues/manager/manage`),
  }),
};

const leagueQueryKeys = {
  league: (leagueId: string) => ({
    queryKey: ['league', { leagueId }],
    queryFn: () => fetcher.get<LeagueType>(`/leagues/${leagueId}`),
  }),

  leagues: (year?: string) => ({
    queryKey: ['leagues', { year }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (year) params.append('year', year);
      return fetcher.get<LeagueListType[]>(`/leagues`, { params });
    },
  }),

  leagueDetail: (leagueId: string) => ({
    queryKey: ['leagueDetail', { leagueId }],
    queryFn: async (): Promise<LeagueDetailType> => {
      const data: LeagueType = await fetcher.get<LeagueType>(
        `/leagues/${leagueId}`,
      );
      return {
        leagueId: Number(leagueId),
        league: data,
      } satisfies LeagueDetailType;
    },
  }),

  leagueTeams: (leagueId: string, descriptionOfRound?: string) => ({
    queryKey: ['leagueTeams', { leagueId, descriptionOfRound }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (descriptionOfRound)
        params.append('descriptionOfRound', descriptionOfRound);
      return fetcher.get<TeamType[]>(`/leagues/${leagueId}/teams`, {
        params,
      });
    },
  }),

  leagueTeam: (leagueTeamId: string) => ({
    queryKey: ['leagueTeam', { leagueTeamId }],
    queryFn: () =>
      fetcher.get<LeagueTeamType>(`/leagues/teams/${leagueTeamId}`),
  }),

  leagueTeamPlayers: (leagueTeamId: string) => ({
    queryKey: ['leagueTeamPlayers', { leagueTeamId }],
    queryFn: () =>
      fetcher.get<TeamPlayerType[]>(`/leagues/teams/${leagueTeamId}/players`),
  }),

  leagueTeamDetail: (leagueTeamId: string) => ({
    queryKey: ['leagueTeamDetail', { leagueTeamId }],
    queryFn: () =>
      fetcher.get<TeamDetailType>(`/leagues/teams/${leagueTeamId}`),
  }),
};

const gameQueryKeys = {
  game: (gameId?: string) => ({
    queryKey: ['game', { gameId }],
    queryFn: () => fetcher.get<GameType>(`/games/${gameId}`),
    enabled: !!gameId,
  }),

  gameCheer: (gameId: string) => ({
    queryKey: ['gameCheer', gameId],
    queryFn: () => fetcher.get<GameCheerType[]>(`/games/${gameId}/cheer`),
  }),

  games: (params: GamesParams) => ({
    queryKey: ['games', params],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      searchParams.append('league_id', String(params.league_id));
      searchParams.append('state', params.state);
      if (params.cursor) searchParams.append('cursor', String(params.cursor));
      if (params.size) searchParams.append('size', String(params.size));
      if (params.league_team_id)
        searchParams.append('league_team_id', String(params.league_team_id));
      if (params.round) searchParams.append('round', String(params.round));
      return fetcher.get<GameType[]>(`/games`, { params: searchParams });
    },
  }),

  gamesByLeagueList: (league: LeagueListType, state: StateType) => ({
    queryKey: ['gamesByLeagueList', { league, state }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('league_id', String(league.leagueId));
      params.append('state', state);
      const data = await fetcher.get<GameType[]>(`/games`, { params });
      return { games: data, league } satisfies GameWithLeagueListType;
    },
  }),

  lineup: (gameId: string) => ({
    queryKey: ['gameLineup', { gameId }],
    queryFn: () => fetcher.get<LineupType[]>(`/games/${gameId}/lineup`),
  }),

  lineupPlaying: (gameId: string) => ({
    queryKey: ['gameLineupPlaying', { gameId }],
    queryFn: () =>
      fetcher.get<PlayingLineupType[]>(`/games/${gameId}/lineup/playing`),
  }),
};

const timelineQueryKeys = {
  timeline: (gameId: string) => ({
    queryKey: ['timeline', { gameId }],
    queryFn: () => fetcher.get<TimelineType[]>(`/games/${gameId}/timeline`),
  }),
};

const cheerTalkQueryKeys = {
  gameCheerTalks: (payload: GameCheerTalkPayload) => ({
    queryKey: ['cheerTalks', payload],
    queryFn: () => {
      const { gameId, cursor, size = 20 } = payload;
      const params = new URLSearchParams();
      params.append('cursor', String(cursor));
      params.append('size', String(size));
      return fetcher.get<CheerTalkType[]>(`/games/${gameId}/cheer-talks`, {
        params,
      });
    },
  }),

  leagueCheerTalks: (payload: LeagueCheerTalkPayload) => ({
    queryKey: ['leagueCheerTalks', payload],
    queryFn: () => {
      const { leagueId, cursor, size = 20 } = payload;
      const params = new URLSearchParams();
      params.append('cursor', String(cursor));
      params.append('size', String(size));
      return fetcher.get<CheerTalkType[]>(`/leagues/${leagueId}/cheer-talks`, {
        params,
      });
    },
  }),

  leagueCheerTalksBlocked: (payload: LeagueCheerTalkPayload) => ({
    queryKey: ['leagueCheerTalksBlocked', payload],
    queryFn: () => {
      const { leagueId, cursor, size = 20 } = payload;
      const params = new URLSearchParams();
      params.append('cursor', String(cursor));
      params.append('size', String(size));
      return fetcher.get<CheerTalkType[]>(
        `/leagues/${leagueId}/cheer-talks/blocked`,
        { params },
      );
    },
  }),

  leagueCheerTalksReported: (payload: LeagueCheerTalkPayload) => ({
    queryKey: ['leagueCheerTalksReported', { payload }],
    queryFn: () => {
      const { leagueId, cursor, size = 20 } = payload;
      const params = new URLSearchParams();
      params.append('cursor', String(cursor));
      params.append('size', String(size));
      return fetcher.get<CheerTalkType[]>(
        `/leagues/${leagueId}/cheer-talks/reported`,
        { params },
      );
    },
  }),
};

export const queryKeys = {
  ...managerQueryKeys,
  ...leagueQueryKeys,
  ...gameQueryKeys,
  ...timelineQueryKeys,
  ...cheerTalkQueryKeys,
};
