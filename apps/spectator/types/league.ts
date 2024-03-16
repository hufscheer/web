export type LeagueType = {
  leagueId: number;
  name: string;
  maxRound: number;
  inProgressRound: number;
  isInProgress: boolean;
};

export type SportType = {
  name: string;
  sportId: number;
};

export type LeagueTeamType = {
  leagueTeamId: number;
  teamName: string;
};
