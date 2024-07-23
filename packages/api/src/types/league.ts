export type LeagueType = {
  name: string;
  startAt: Date;
  endAt: Date;
  maxRound: number;
  inProgressRound: number;
  isInProgress: boolean;
};

export type LeagueListType = Omit<LeagueType, 'startAt' | 'endAt'> & {
  leagueId: number;
};
