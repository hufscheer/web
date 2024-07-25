import { fetcher } from './fetcher';
import {
  GameType,
  GameWithLeagueListType,
  LeagueDetailType,
  LeagueListType,
  LeagueType,
  StateType,
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
      return { leagueId: Number(leagueId), league: data } as LeagueDetailType;
    },
  }),
};

const gameQueryKeys = {
  game: (gameId: string) => ({
    queryKey: ['game', { gameId }],
    queryFn: () => fetcher.get<GameType>(`/games/${gameId}`),
  }),

  games: (
    league_id: string,
    state: StateType,
    cursor?: number,
    size?: number,
    league_team_id?: number,
    round?: number,
  ) => ({
    queryKey: [
      'games',
      { league_id, state, cursor, size, league_team_id, round },
    ],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append('league_id', String(league_id));
      params.append('state', state);
      if (cursor) params.append('cursor', String(cursor));
      if (size) params.append('size', String(size));
      if (league_team_id)
        params.append('league_team_id', String(league_team_id));
      if (round) params.append('round', String(round));
      return fetcher.get<GameType[]>(`/games`, { params });
    },
  }),

  gamesByLeagueList: (league: LeagueListType, state: StateType) => ({
    queryKey: ['gamesByLeagueList', { league, state }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('league_id', String(league.leagueId));
      params.append('state', state);
      const data = await fetcher.get<GameType[]>(`/games`, { params });
      return { games: data, league } as GameWithLeagueListType;
    },
  }),
};

export const queryKeys = { ...leagueQueryKeys, ...gameQueryKeys };
