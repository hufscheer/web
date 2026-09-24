import type { GameStateType, GameType } from './games';
import type { TeamPlayerType } from './teams';

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
  thirdPlaceMatchEnabled: boolean;
  startAt: string;
  endAt: string;
  teamIds: number[];
  sportType: SportType;
  bracketEnabled: boolean;
  inProgressRound?: number;
};

export type LeagueListItemType = {
  leagueId: number;
  name: string;
  maxRound: number;
  inProgressRound: number;
  leagueProgress: LeagueStateType;
  sportType: SportType;
};

export type LeagueStatisticsTeamType = {
  teamId: number;
  leagueTeamId: number;
  teamName: string;
  logoImageUrl: string | null;
  sizeOfTeamPlayers: number;
  cheerCount?: number;
  cheerTalksCount?: number;
};

export type LeagueStatisticsType = {
  firstWinnerTeam: LeagueStatisticsTeamType | null;
  secondWinnerTeam: LeagueStatisticsTeamType | null;
  mostCheeredTeam: LeagueStatisticsTeamType | null;
  mostCheerTalksTeam: LeagueStatisticsTeamType | null;
};

export type LeagueTopScorerType = {
  playerId: number;
  playerName: string;
  admissionYear: string;
  ranking: number;
  goalCount: number;
};

export type LeagueCheerCountType = {
  cheerTalkCount: number;
};

export type BracketTeamType = {
  teamId: number;
  name: string;
  logoImageUrl: string | null;
};

export type BracketMatchType = {
  id: number;
  matchNumber: number;
  team1: BracketTeamType | null;
  team2: BracketTeamType | null;
  gameId: number | null;
  gameState: GameStateType | null;
  gameStartTime: string | null;
  winnerTeamId: number | null;
};

export type BracketType = {
  size: number;
  rounds: { round: number; matches: BracketMatchType[] }[];
  thirdPlaceMatch: BracketMatchType | null;
};

export type BracketEntryType = {
  position: number;
  teamId: number;
};

export type LeagueTeamsPayload = {
  leagueId: number;
  round?: number;
  thirdPlaceMatch?: boolean;
};

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
