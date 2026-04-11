import type { GameTeamType } from '~/api';

const quarters = [
  { key: 'PRE_GAME', label: '경기전' },
  { key: 'FIRST_HALF', label: '전반전' },
  { key: 'SECOND_HALF', label: '후반전' },
  { key: 'EXTRA_TIME', label: '연장전' },
  { key: 'PENALTY_SHOOTOUT', label: '승부차기' },
  { key: 'POST_GAME', label: '경기후' },
] as const;

export type GameQuarterType = (typeof quarters)[number];

type GameData = {
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

export type GameType = {
  gameId: number;
} & GameData;

export type GameStateType = 'SCHEDULED' | 'PLAYING' | 'FINISHED';

export type GameSearchPayload = {
  year: number;
  month: number;
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
  gameState: GameStateType;
} & GameData;

export type GameListResponse = {
  leagueId: number;
  leagueName: string;
  leagueProgress: 'BEFORE_START' | 'IN_PROGRESS' | 'FINISHED';
  games: GameListType[];
};

export type GameDetailPayload = { gameId: number };

export type GameCheerPayload = { gameId: number };

export type GameCheerType = {
  gameTeamId: number;
  cheerCount: number;
};

export type GameLineupPayload = { gameId: number };

export type GameTeamPlayerType = {
  id: number;
  playerName: string;
  description?: string;
  jerseyNumber: number;
  isCaptain: boolean;
  isReplaced: boolean;
  replacedPlayer: Pick<GameTeamPlayerType, 'id' | 'jerseyNumber' | 'playerName'> | null;
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
  teamColor: string;
  gameTeamPlayers: GameTeamPlayerType[];
};

export type GameVideoPayload = { gameId: number };

export type GameVideoType = {
  videoId: string;
};
