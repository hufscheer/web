import { SportsQuarterType } from './match';

export type LeagueIdType = {
  leagueId: number;
};

export type LeagueDataType = {
  name: string;
  startAt: string;
  endAt: string;
};

export type SportIdType = {
  sportId: number;
};

export type SportsDataType = number[];

export type SportsCategoriesType = SportIdType & SportsQuarterType;

export type LeagueType = LeagueIdType & LeagueDataType;

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
