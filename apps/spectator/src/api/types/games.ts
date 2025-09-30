import type { GameTeamType } from '~/api';

type GameData = {
  startTime: string;
  gameQuarter: string;
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
  gameTeamPlayers: GameTeamPlayerType[];
};

export type GameVideoPayload = { gameId: number };

export type GameVideoType = {
  videoId: string;
};
