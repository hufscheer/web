import { SportsQuarterType } from './match';

export type LeagueIdType = {
  leagueId: number;
};

export type LeagueDataType = {
  name: string;
  startAt: string;
  endAt: string;
  maxRound: number;
};

export type SportIdType = {
  sportId: number;
};

export type SportsDataType = number[];

export type SportsCategoriesType = SportIdType & SportsQuarterType;

export type LeagueCategory = 'playing' | 'scheduled' | 'finished';

export type LeagueType = LeagueIdType &
  LeagueDataType & {
    InProgressRound: number;
    maxRound: number;
  };
export type LeagueListType = Record<LeagueCategory, LeagueType[]>;

export type NewLeaguePayload = {
  leagueData: LeagueDataType;
  sportData: SportsDataType;
};

export type PutLeaguePayload = LeagueIdType & NewLeaguePayload;

export type DeleteLeaguePayload = LeagueIdType;

export type LeagueRegisterDataType = {
  leagueData: LeagueType[];
  sportsListData: SportsCategoriesType[];
};

export type LeagueTeamPayload = { names: string[]; logos: string[] };

export type LeaguePlayerPayload = {
  name: string;
  description: string | null;
  playerNumber: number | null;
};

export interface GameListType extends GameType {
  id: number;
}

export type GameListParams = {
  league_id?: number;
  state: GameState;
  sport_id?: string;
  cursor?: string | number;
  size?: string;
  league_team_id?: string;
  round?: string;
};

export interface GameType {
  gameTeams: GameTeamType[];
  startTime: string;
  gameQuarter: string;
  gameName: string;
  sportsName: string;
}

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
};

export type GameState = 'playing' | 'scheduled' | 'finished';
