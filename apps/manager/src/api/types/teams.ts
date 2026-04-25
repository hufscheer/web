import type { SportType } from './leagues';

export type TeamPlayerType = {
  playerId: number;
  name?: string;
  studentNumber?: string;
  jerseyNumber: number;
};

export type TeamType = {
  id: number;
  name: string;
  logoImageUrl: string;
  unit: string;
  teamColor: string;
  sportType: SportType;
  teamPlayers?: TeamPlayerType[];
};

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
  pkScore: number;
};

export type TeamDetailPayload = {
  id: number;
};

export type TeamUnitType = {
  id: number;
  unitName: string;
  hasTeam: boolean;
};
