import type { GameType } from '~/api/types/games';

export const LEAGUE_STATE = {
  IN_PROGRESS: '진행 중',
  FINISHED: '종료',
  SCHEDULED: '예정',
} as const;

export type LeagueStateType = (typeof LEAGUE_STATE)[keyof typeof LEAGUE_STATE];

export type LeagueType = {
  id: string;
  name: string;
  state: LeagueStateType;
  inProgressGames: GameType[];
};

export type LeagueDetailType = {
  id: string;
  name: string;
  leagueProgress: LeagueStateType;
  sizeOfLeagueTeams: number;
  maxRound: number;
  startAt: string;
  endAt: string;
};
