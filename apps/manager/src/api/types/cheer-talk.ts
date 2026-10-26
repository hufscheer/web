export type CheerTalkType = {
  cheerTalkId: number;
  gameId: number;
  leagueId: number;
  /** 차단된 응원톡은 서버가 내용을 비워 보낸다 */
  content: string | null;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
  gameName: string;
  leagueName: string;
};

export type CheerTalkListResponse = {
  content: CheerTalkType[];
  nextCursor: number | null;
  hasNext: boolean;
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
