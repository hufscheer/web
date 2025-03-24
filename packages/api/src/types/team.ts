export type TeamType = {
  leagueTeamId: number;
  teamName: string;
  logoImageUrl: string;
  sizeOfLeagueTeamPlayers: number;
};

export type TeamPlayerType = {
  id: number;
  name: string;
  studentNumber?: string;
  number: number;
  description?: string;
};

export type TeamPlayerCreateType = Pick<TeamPlayerType, 'name' | 'number'>;

export type TeamCreateType = {
  name: string;
  logoImageUrl: string;
  players: TeamPlayerCreateType[];
};

export type LeagueTeamType = Pick<TeamType, 'teamName' | 'logoImageUrl'> & {
  leagueTeamPlayers: TeamPlayerType[];
};

export type TeamUpdateType = {
  name: string;
  logoImageUrl: string;
  newPlayers: TeamPlayerCreateType[];
  updatedPlayers: TeamPlayerType[];
  deletedPlayerIds: number[];
};

export type TeamDetailType = {
  logoImageUrl: string;
  teamName: string;
  leagueTeamPlayers: (TeamPlayerType & { id: number })[];
};
