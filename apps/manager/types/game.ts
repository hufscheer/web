export type GameCreatePayload = {
  sportsId: number;
  startTime: string;
  gameName: string;
  videoId: string | null;
  teamIds: number[];
  round: number;
};
