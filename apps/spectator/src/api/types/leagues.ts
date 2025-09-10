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
