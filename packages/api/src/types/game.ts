import { LeagueListType } from './league';

export const stateMap = {
  PLAYING: '진행 중',
  SCHEDULED: '시작 전',
  FINISHED: '종료',
} as const;

export type StateType = keyof typeof stateMap;
export type StateValueType = (typeof stateMap)[keyof typeof stateMap];

export type CreateGameType = {
  name: string;
  round: number;
  quarter: string;
  state: StateType;
  startTime: string;
  idOfTeam1: number;
  idOfTeam2: number;
  videoId: string | null;
};

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
  pkScore: number;
};

export type GameTeamDirectionType = 'left' | 'right';

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
  isPkTaken: boolean;
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

export type GameTeamPlayerType = {
  id: number;
  playerName: string;
  description?: string;
  number: number;
  isCaptain: boolean;
  isReplaced: boolean;
  replacedPlayer: Pick<GameTeamPlayerType, 'id' | 'number' | 'playerName'> | null;
  state: 'STARTER' | 'CANDIDATE';
};

export type GameLineupType = {
  gameTeamId: number;
  teamName: string;
  starterPlayers: GameTeamPlayerType[];
  candidatePlayers: GameTeamPlayerType[];
};

export type GameLineupPlayingType = {
  gameTeamId: number;
  teamName: string;
  gameTeamPlayers: GameTeamPlayerType[];
};

export type GameCheerType = {
  gameTeamId: number;
  cheerCount: number;
};

export type GameVideoType = {
  videoId: string;
};
