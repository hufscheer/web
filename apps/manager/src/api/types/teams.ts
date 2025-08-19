export type TeamType = {
  id: number;
  name: string;
  logoImageUrl: string;
  unit: string;
  teamColor: string;
};

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
  pkScore: number;
};
