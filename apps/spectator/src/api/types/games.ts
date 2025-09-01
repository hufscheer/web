import type { GameTeamType } from '~/api';

type GameData = {
  startTime: string;
  gameQuarter: string;
  gameName: string;
  round: number;
  videoId: string;
  gameTeams: GameTeamType[];
  isPkTaken: boolean;
  leagueId: number;
  leagueName: string;
};

export type GameType = {
  gameId: number;
} & GameData;

export type GameStateType = 'SCHEDULED' | 'PLAYING' | 'FINISHED';

export type GameListPayload = {
  league_id?: number;
  state?: GameStateType;
  cursor?: number;
  size?: number;
  league_team_id?: number;
  round?: number;
};

export type GameListResponse = {
  leagueId: number;
  leagueName: string;
  games: ({ id: number } & GameData)[];
};
