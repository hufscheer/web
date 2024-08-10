export type TeamType = {
  leagueTeamId: number;
  teamName: string;
  logoImageUrl: string;
  sizeOfLeagueTeamPlayers: number;
};

export type TeamPlayerType = {
  name: string;
  number: number;
};

export type TeamCreateType = {
  name: string;
  logoImageUrl: string;
  players: TeamPlayerType[];
};
