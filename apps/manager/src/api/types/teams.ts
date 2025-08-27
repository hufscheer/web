export type TeamPlayerType = {
  playerId: number;
  jerseyNumber: number;
};

export type TeamType = {
  id: number;
  name: string;
  logoImageUrl: string;
  unit: string;
  teamColor: string;
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
