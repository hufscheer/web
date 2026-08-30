import type { TeamUnitType, TopScorerType } from './teams';

export type SportType = 'SOCCER' | 'BASKETBALL';

export type LeagueType = {
  leagueId: number;
  name: string;
  inProgressRound: number;
  leagueProgress: string;
  winnerTeamName: string | null;
};

export type LeagueListPayload = {
  year?: number;
  leagueProgress?: 'BEFORE_START' | 'IN_PROGRESS' | 'FINISHED';
  cursor?: number;
  size?: number;
  sportType?: SportType;
  organizationId?: number;
};

export type LeagueDetailPayload = {
  leagueId: number;
};

export type LeagueRecentGamesPayload = {
  sportType?: SportType;
  organizationId?: number;
};

export type LeagueDetailType = {
  name: string;
  startAt: string;
  endAt: string;
  maxRound: number;
  inProgressRound: number;
  leagueProgress: string;
  leagueTeamCount: number;
  thirdPlaceMatchEnabled: boolean;
};

export type LeagueRecentSummaryPayload = {
  year?: number;
  recordLimit?: number;
  topScorerLimit?: number;
};

export type LeagueRecentSummaryType = {
  records: LeagueType[];
  topScorers: (TopScorerType & { unit: TeamUnitType })[];
};

export type LeagueCheerCountPayload = {
  leagueId: number;
};

export type LeagueCheerCountType = {
  cheerTalkCount: number;
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
