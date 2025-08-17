import type { GameType } from '~/api/types/games';

export type LeagueStateType = '진행 중' | '종료' | '예정';

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
