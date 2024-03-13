export type ReportType = {
  pending: ReportData[];
  isBlocked: ReportData[];
};

export type ReportData = {
  gameInfo: GameInfo;
  reportInfo: ReportInfo;
};

export type GameInfo = {
  leagueName: string;
  sportName: string;
  gameName: string;
};

export type ReportInfo = {
  cheerTalkId: number;
  reportId: number;
  content: string;
  createdAt: string;
  reportedAt: string;
};
