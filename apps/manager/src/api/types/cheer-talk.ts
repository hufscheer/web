export type CheerTalkListResponse = {
  content: CheerTalkType[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type CheerTalkType = {
  cheerTalkId: number;
  gameId: number;
  leagueId: number;
  content: string;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
  gameName: string;
  leagueName: string;
};

export type CheerTalkPayload = {
  cursor: number;
  size: number;
};

export type LeagueCheerTalkPayload = CheerTalkPayload & {
  leagueId: number;
};

export type GameCheerTalkPayload = CheerTalkPayload & {
  gameId: number;
};
