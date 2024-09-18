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
  TeamType,
} from './types';

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

  leaguesDetail: (leagueId: string) => ({
    queryKey: ['leaguesDetail', { leagueId }],
    queryFn: async () => {
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
};

const gameQueryKeys = {
  game: (gameId: string) => ({
    queryKey: ['game', { gameId }],
    queryFn: () => fetcher.get<GameType>(`/games/${gameId}`),
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
};

export const queryKeys = { ...leagueQueryKeys, ...gameQueryKeys };
