import type { GameTeamType } from '~/api/types/teams';

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
