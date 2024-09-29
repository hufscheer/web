import { GameType, StateValueType } from './game';

export type LeagueType = {
  name: string;
  startAt: string;
  endAt: string;
  maxRound: number;
  inProgressRound: number;
  isInProgress: boolean;
};

export type LeagueListType = Omit<LeagueType, 'startAt' | 'endAt'> & {
  leagueId: number;
};

export type LeagueDetailType = {
  leagueId: number;
  league: LeagueType;
};

export type LeagueCreateType = Omit<
  LeagueType,
  'inProgressRound' | 'isInProgress'
>;

export type LeagueUpdateType = Omit<
  LeagueType,
  'inProgressRound' | 'isInProgress' | 'maxRound'
> & {
  maxRound: string;
};

export type ManagerLeagueType = {
  id: number;
  name: string;
  state: StateValueType;
  inProgressGames: Pick<
    GameType,
    'id' | 'state' | 'startTime' | 'gameTeams' | 'isPkTaken'
  >[];
};

export type ManagerManageLeagueType = Omit<
  LeagueType,
  'inProgressRound' | 'isInProgress' | 'maxRound'
> & {
  id: number;
  leagueProgress: StateValueType;
  sizeOfLeagueTeams: number;
  maxRound: string;
};
