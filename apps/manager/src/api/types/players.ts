import type { TeamType } from '~/api';

export type PlayerType = {
  playerId: number;
  name: string;
  studentNumber: string;
  totalGoalCount: number;
  teams: TeamType[];
};
