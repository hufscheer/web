import type { GameType, TeamPlayerType } from '~/api';

export const LEAGUE_STATE = {
  IN_PROGRESS: '진행 중',
  FINISHED: '종료',
  SCHEDULED: '예정',
} as const;

export type LeagueStateType = (typeof LEAGUE_STATE)[keyof typeof LEAGUE_STATE];

export type SportType = 'SOCCER' | 'BASKETBALL';

export type LeagueType = {
  id: number;
  name: string;
  state: LeagueStateType;
  sportType: SportType;
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
  sportType: SportType;
};

export type LeagueTeamsPayload = { leagueId: number };

export type LeagueTeamType = {
  teamId: number;
  leagueTeamId: number;
  teamName: string;
  logoImageUrl: string;
  sizeOfTeamPlayers: number;
  cheerCount: number;
  cheerTalksCount: number;
};

export type LeagueTeamsPlayersPayload = { leagueTeamId: number };

export type LeagueTeamsPlayerType = TeamPlayerType & {
  teamPlayerId: number;
  name: string;
  studentNumber: string;
};
