export type CheerTalkType = {
  cheerTalkId: number;
  content: string;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
};

export type CheerTalkListResponse = {
  content: CheerTalkType[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type CheerTalkPayload = {
  gameId: number;
};

export type TeamDirection = 'HOME' | 'AWAY';

export type GameCheerTalkWithTeamInfo = CheerTalkType & {
  direction: TeamDirection;
  logoImageUrl: string;
};
