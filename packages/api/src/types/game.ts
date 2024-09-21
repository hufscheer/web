import { LeagueListType } from './league';

export const stateMap = {
  PLAYING: '진행 중',
  SCHEDULED: '시작 전',
  FINISHED: '종료',
} as const;

export type StateType = keyof typeof stateMap;

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
};

export type GameType = {
  id: number;
  startTime: Date;
  gameQuarter: string;
  gameName: string;
  round: number;
  videoId?: string;
  gameTeams: GameTeamType[];
  sportsName: string;
  state: StateType;
};

export type GameWithLeagueListType = {
  games: GameType[];
  league: LeagueListType;
};

export type GamesParams = {
  league_id: string;
  state: StateType;
  cursor?: number;
  size?: number;
  league_team_id?: number;
  round?: number;
};
