export type CheerTalkType = {
  cheerTalkId: number;
  content: string;
  gameTeamId: number;
  createdAt: Date;
  isBlocked: boolean;
};

export type CheerTalkPayload = {
  cursor?: number | string;
  size?: number;
};

export type LeagueCheerTalkPayload = CheerTalkPayload & {
  leagueId: string;
};

export type GameCheerTalkPayload = CheerTalkPayload & {
  gameId: string;
};
