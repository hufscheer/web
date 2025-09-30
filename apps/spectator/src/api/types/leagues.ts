export type LeagueType = {
  leagueId: number;
  name: string;
  inProgressRound: number;
  leagueProgress: string;
  winnerTeamName: string | null;
};

export type LeagueListPayload = {
  year: number;
  leagueProgress?: 'BEFORE_START' | 'IN_PROGRESS' | 'FINISHED';
  cursor?: number;
  size: number;
};

export type LeagueDetailPayload = {
  leagueId: number;
};

export type LeagueDetailType = {
  name: string;
  startAt: string;
  endAt: string;
  maxRound: number;
  inProgressRound: number;
  leagueProgress: string;
  leagueTeamCount: number;
};

export type StatisticTeamType = {
  teamId: number;
  leagueTeamId: number;
  teamName: string;
  logoImageUrl: string;
  sizeOfTeamPlayers: number;
};

export type LeagueStatisticsType = {
  firstWinnerTeam: StatisticTeamType;
  secondWinnerTeam: StatisticTeamType;
  mostCheeredTeam: StatisticTeamType & { cheerCount: number };
  mostCheerTalksTeam: StatisticTeamType & { cheerTalksCount: number };
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

export type LeagueTeamsPayload = {
  leagueId: number;
  round: number;
};

export type LeagueTeamType = {
  teamId: number;
  leagueTeamId: number;
  teamName: string;
  logoImageUrl: string;
  sizeOfTeamPlayers: number;
  cheerCount: number;
  cheerTalkCount: number;
};
