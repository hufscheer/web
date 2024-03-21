// export type GameInfoType = {
//   sports: SportsType;
//   startTime: string;
//   gameName: string;
//   state: gameStateType;
//   videoId: string | null;
//   gameQuarter: string;
// };

// export const gameState = {
//   PLAYING: '진행중',
//   SCHEDULED: '예정',
//   FINISHED: '종료',
// } as const;

// export type gameStateType = keyof typeof gameState;

// export type SportsQuarterType = {
//   id: number;
//   name: string;
// };

// export type SportsIdType = {
//   sportsId: number;
// };

// export type SportsNameType = {
//   sportsName: string;
// };

// export type SportsType = SportsIdType & SportsNameType;

// export type PutMatchInfoPayload = Omit<GameInfoType, 'sports'> & SportsIdType;

// export type MatchInfoStateType = Omit<GameInfoType, 'sports'> & SportsNameType;
