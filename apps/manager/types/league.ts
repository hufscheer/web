import { StateType, SportsQuarterType } from './game';

export type LeagueIdType = {
  leagueId: number;
};

export type LeagueDataType = {
  name: string;
  startAt: string;
  endAt: string;
  maxRound: number;
  inProgressRound: number;
};

export type SportIdType = {
  sportId: number;
};

export type SportsDataType = number[];

export type SportsCategoriesType = SportIdType & SportsQuarterType;

export type LeagueType = LeagueIdType &
  LeagueDataType & {
    inProgressRound: number;
    maxRound: number;
  };
export type LeagueListType = Record<StateType, LeagueType[]>;

export type NewLeaguePayload = {
  leagueData: LeagueDataType;
  sportData: SportsDataType;
};

export type UpdateLeaguePayload = LeagueIdType & NewLeaguePayload;

export type DeleteLeaguePayload = LeagueIdType;

export type LeagueRegisterDataType = {
  leagueData: LeagueType[];
  sportsListData: SportsCategoriesType[];
};

export type LeaguePlayerPayload = {
  name: string;
  description: string | null;
  number: number;
};

export type LeaguePlayerWithIDPayload = LeaguePlayerPayload & {
  id: number;
};
