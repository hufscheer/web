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
  /**
   * 팀 원본 id. gameTeamId 는 경기마다 새로 생기는 값이라
   * GET /leagues/{id}/teams 의 teamId 와 이어 붙이려면 이게 필요하다.
   * 아직 안 내려주는 서버가 있을 수 있어 optional 로 둔다.
   */
  teamId?: number;
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
