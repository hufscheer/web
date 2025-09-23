export type CheerTalkType = {
  cheerTalkId: number;
  gameId?: number;
  leagueId?: number;
  content: string;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
  gameName: string;
  leagueName: string;
};

export type CheerTalkPayload = {
  gameId: number;
};

export type TeamDirection = 'HOME' | 'AWAY';

export type GameCheerTalkWithTeamInfo = CheerTalkType & {
  direction: TeamDirection;
  logoImageUrl: string;
};
