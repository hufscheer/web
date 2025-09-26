import type { GameTeamType } from '~/api';

export type GameStateType = 'SCHEDULED' | 'PLAYING' | 'FINISHED';

export type GameType = {
  id: number;
  isPkTaken: boolean;
  startTime: string;
  state: GameStateType;
  gameName: string;
  round: number;
  videoId: string;
  gameTeams: GameTeamType[];
};

export type GameData = {
  startTime: string;
  gameQuarter: string;
  gameName: string;
  round: number;
  videoId: string;
  gameTeams: GameTeamType[];
  isPkTaken: boolean;
  leagueId: number;
  leagueName: string;
  state: GameStateType;
};

export type GameListPayload = {
  league_id?: number;
  state?: GameStateType;
  cursor?: number;
  size?: number;
  league_team_id?: string;
  round?: number;
};

export type GameListType = {
  id: number;
} & GameData;

export type GameListResponse = {
  leagueId: number;
  leagueName: string;
  games: GameListType[];
};
