import type { TeamType } from './teams';

export type PlayerType = {
  playerId: number;
  teamPlayerId?: number | null;
  name: string;
  studentNumber: string;
  jerseyNumber?: number | null;
  totalGoalCount: number;
  teams: TeamType[];
};

export type PlayerSearchPayload = {
  name?: string;
  studentNumber?: string;
  size: number;
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
