import type { GameTeamType } from '~/api';

export type GameStateType = 'SCHEDULED' | 'PLAYING' | 'FINISHED';

export type GameType = {
  id: number;
  isPkTaken: boolean;
  startTime: string;
  state: GameStateType;
  gameName: string;
  round: number;
  videoId: string;
  gameTeams: GameTeamType[];
};

export type GameData = {
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

export type GameTeamPlayerType = {
  id: number;
  playerName: string;
  description?: string;
  number: number;
  jerseyNumber?: number;
  isCaptain: boolean;
  isReplaced: boolean;
  replacedPlayer: Pick<GameTeamPlayerType, 'id' | 'number' | 'playerName'> | null;
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
