import type { GameTeamType } from '~/api';

export type GameType = {
  id: number;
  isPkTaken: boolean;
  startTime: string;
  gameQuarter: string;
  gameName: string;
  round: number;
  videoId: string;
  gameTeams: GameTeamType[];
};
