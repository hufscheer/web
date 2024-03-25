export type LeagueType = {
  leagueId: number;
  name: string;
  maxRound: number;
  inProgressRound: number;
  isInProgress: boolean;
};

export interface LeagueDetail extends Omit<LeagueType, 'leagueId'> {
  startAt: '2024-03-25T00:00:00';
  endAt: '2024-03-26T00:00:00';
}

export type SportType = {
  name: string;
  sportId: number;
};

export type LeagueTeamType = {
  leagueTeamId: number;
  teamName: string;
};
