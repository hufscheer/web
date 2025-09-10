import type { TeamType } from '~/api';

export type LeagueType = {
  leagueId: number;
  name: string;
  inProgressRound: number;
  leagueProgress: string;
  winnerTeamName: string | null;
};

export type LeagueListPayload = {
  year: number;
  leagueProgress: 'BEFORE_START' | 'IN_PROGRESS' | 'FINISHED';
  cursor?: number;
  size: number;
};

export type LeagueStatisticsType = {
  firstWinnerTeam: TeamType;
  secondWinnerTeam: TeamType;
  mostCheeredTeam: TeamType;
  mostCheerTalksTeam: TeamType;
};

export type LeagueStatisticsPayload = {
  leagueId: number;
};

export type LeagueTopScorersType = {
  playerId: number;
  playerName: string;
  admissionYear: number;
  ranking: number;
  goalCount: number;
};

export type LeagueTopScorersPayload = {
  leagueId: number;
};
