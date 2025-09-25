import type { GameType } from '~/api';

export const LEAGUE_STATE = {
  IN_PROGRESS: '진행 중',
  FINISHED: '종료',
  SCHEDULED: '예정',
} as const;

export type LeagueStateType = (typeof LEAGUE_STATE)[keyof typeof LEAGUE_STATE];

export type LeagueType = {
  id: number;
  name: string;
  state: LeagueStateType;
  inProgressGames: GameType[];
};

export type LeagueDetailPayload = {
  leagueId: number;
};

export type LeagueDetailType = {
  id: number;
  name: string;
  leagueProgress: LeagueStateType;
  sizeOfLeagueTeams: number;
  leagueTeamCount: number;
  maxRound: number;
  startAt: string;
  endAt: string;
  teamIds: number[];
};
