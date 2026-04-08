import type { GameTeamType } from '~/api';

export type GameStateType = 'SCHEDULED' | 'PLAYING' | 'FINISHED';

const quarters = [
  { key: 'PRE_GAME', label: '경기전' },
  { key: 'FIRST_HALF', label: '전반전' },
  { key: 'SECOND_HALF', label: '후반전' },
  { key: 'EXTRA_TIME', label: '연장전' },
  { key: 'PENALTY_SHOOTOUT', label: '승부차기' },
  { key: 'POST_GAME', label: '경기후' },
] as const;

export type GameQuarterType = (typeof quarters)[number];

export type GameType = {
  id: number;
  isPkTaken: boolean;
  startTime: string;
  state: GameStateType;
  gameName: string;
  gameQuarter: GameQuarterType;
  round: number;
  videoId: string;
  gameTeams: GameTeamType[];
};

export type GameData = {
  startTime: string;
  gameQuarter: GameQuarterType;
  gameName: string;
  round: number;
  videoId: string;
  gameTeams: GameTeamType[];
  isPkTaken: boolean;
  leagueId: number;
  leagueName: string;
  state: GameStateType;
};

export type GameListPayload = {
  league_id?: number;
  state?: GameStateType;
  cursor?: number;
  size?: number;
  league_team_id?: string;
  round?: number;
};

export type GameListType = {
  id: number;
} & GameData;

export type GameListResponse = {
  leagueId: number;
  leagueName: string;
  games: GameListType[];
};
export type GameDetailPayload = { gameId: number };

export type GameLineupPayload = { gameId: number };

export type ReplacedPlayerType = {
  id: number;
  number: number;
  playerName: string;
};

export type GameTeamPlayerType = {
  lineupPlayerId: number;
  playerId: number;
  playerName: string;
  description?: string;
  jerseyNumber: number;
  isCaptain: boolean;
  isReplaced: boolean;
  replacedPlayer: ReplacedPlayerType | null;
  state: 'STARTER' | 'CANDIDATE';
};

export type GameLineupType = {
  gameTeamId: number;
  teamName: string;
  starterPlayers: GameTeamPlayerType[];
  candidatePlayers: GameTeamPlayerType[];
};

export type GameLineupPlayingType = {
  gameTeamId: number;
  teamName: string;
  gameTeamPlayers: GameTeamPlayerType[];
};
export type GameTeamLineupCreateRequest = {
  teamPlayerId: number;
  state: 'STARTER' | 'CANDIDATE';
  isCaptain: boolean;
  gameTeamId: number;
};
