import type { TeamType } from '~/api';

export type PlayerType = {
  playerId: number;
  name: string;
  studentNumber: string;
  totalGoalCount: number;
  teams: TeamType[];
};

export type PlayerDetailPayload = {
  id: number;
};

export type PlayerListPayload = {
  cursor: number;
  size: number;
  name: string;
  studentNumber: string;
};

export type PlayerListResponse = {
  content: PlayerType[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type TeamPlayer = {
  playerId: number;
  jerseyNumber: number;
};
