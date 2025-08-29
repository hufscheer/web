import type { GameTeamType } from './teams';

export type GameType = {
  id: number;
  startTime: string;
  gameQuarter: string;
  gameName: string;
  round: number;
  videoId: string;
  gameTeams: GameTeamType[];
  isPkTaken: boolean;
};

export type GameListPayload = {
  league_id?: number;
  state?: 'SCHEDULED' | 'PLAYING' | 'FINISHED';
  cursor?: number;
  size?: number;
  league_team_id?: number;
  round?: number;
};
