import type { SportType, UndeletableReasonCode } from '@hcc/manager-api';

export type { SportType, UndeletableReasonCode };

export type GameState = 'SCHEDULED' | 'PLAYING' | 'FINISHED';
export type LineupPlayerState = 'STARTER' | 'CANDIDATE';

export type Position =
  | 'GK'
  | 'LB'
  | 'CB'
  | 'RB'
  | 'LM'
  | 'CM'
  | 'RM'
  | 'LW'
  | 'ST'
  | 'RW'
  | 'FW'
  | 'MF'
  | 'DF'
  | 'PG'
  | 'SG'
  | 'SF'
  | 'PF'
  | 'C'
  | 'G'
  | 'F';

export type TimelineType =
  | 'SCORE'
  | 'OWN_GOAL'
  | 'SOCCER_REPLACEMENT'
  | 'BASKETBALL_REPLACEMENT'
  | 'GAME_PROGRESS'
  | 'PK'
  | 'WARNING_CARD'
  | 'FOUL';

export type League = {
  leagueId: number;
  name: string;
  startAt: string;
  endAt: string;
  maxRound: number;
  inProgressRound: number;
  leagueProgress: string;
  sportType: SportType;
  thirdPlaceMatchEnabled: boolean;
  leagueTeamCount: number;
};

export type ManagerLeague = Omit<League, 'inProgressRound'>;

export type GameTeam = {
  gameTeamId: number;
  teamId: number | null;
  gameTeamName: string;
  teamColor: string;
  logoImageUrl: string | null;
  score: number;
  pkScore: number;
};

export type Game = {
  gameId: number;
  leagueId: number;
  leagueName: string;
  gameName: string;
  sportType: SportType;
  state: GameState;
  round: number;
  /** 결승과 3·4위전은 round 가 둘 다 2 라서 이것으로만 구분된다 */
  thirdPlaceMatch: boolean;
  startTime: string;
  isPkTaken: boolean;
  gameQuarter: { key: string; label: string };
  gameTeams: [GameTeam, GameTeam];
  videoId: string;
};

export type LineupPlayer = {
  lineupPlayerId: number;
  playerId: number;
  playerName: string;
  jerseyNumber: number;
  position: Position | null;
  isCaptain: boolean;
  state: LineupPlayerState;
  isPlaying: boolean;
  isReplaced: boolean;
  replacedPlayerName: string | null;
  foulCount?: number;
};

export type Lineup = {
  gameTeamId: number;
  teamName: string;
  starterPlayers: LineupPlayer[];
  candidatePlayers: LineupPlayer[];
  /** 관객 화면에 포지션이 나가는지. 서버가 팀 단위로 정한다 */
  positionsPublic?: boolean;
};

export type TimelineRecord = {
  recordId: number;
  type: TimelineType;
  recordedQuarter: string;
  recordedAt: number;
  gameTeamId: number;
  title: string;
  subtitle: string;
  snapshot: [number, number] | null;
  scoreValue?: number;
  deletable: boolean;
  undeletableReason: string | null;
  undeletableReasonCode: UndeletableReasonCode | null;
};

export type Team = {
  teamId: number;
  name: string;
  sportType: SportType;
  unitName: string;
  logoColor: string;
  logoImageUrl: string | null;
};

export type TeamPlayerRow = {
  playerId: number;
  teamPlayerId: number;
  name: string;
  studentNumber: string;
  jerseyNumber: number | null;
};

export type Player = {
  playerId: number;
  name: string;
  studentNumber: string;
  teams: { teamId: number; teamName: string; sportType: SportType }[];
};

export type BracketTeam = {
  teamId: number;
  name: string;
  logoImageUrl: string | null;
};

export type BracketMatch = {
  id: number;
  matchNumber: number;
  team1: BracketTeam | null;
  team2: BracketTeam | null;
  gameId: number | null;
  gameState: GameState | null;
  gameStartTime: string | null;
  winnerTeamId: number | null;
};

export type Bracket = {
  size: number;
  rounds: { round: number; matches: BracketMatch[] }[];
  thirdPlaceMatch: BracketMatch | null;
};
