export const soccerQuarterOptions = {
  PRE_GAME: '경기 전',
  FIRST_HALF: '전반전',
  SECOND_HALF: '후반전',
  EXTRA_TIME: '연장전',
  PENALTY_SHOOTOUT: '승부차기',
  POST_GAME: '경기 후',
} as const;

export const basketballQuarterOptions = {
  PRE_GAME: '경기 전',
  FIRST_QUARTER: '1쿼터',
  SECOND_QUARTER: '2쿼터',
  THIRD_QUARTER: '3쿼터',
  FOURTH_QUARTER: '4쿼터',
  OVERTIME: '연장전',
  POST_GAME: '경기 후',
} as const;

export const getQuarterOptions = (sportType: 'SOCCER' | 'BASKETBALL') =>
  sportType === 'BASKETBALL' ? basketballQuarterOptions : soccerQuarterOptions;

/** @deprecated Use getQuarterOptions(sportType) instead */
export const quarterOptions = {
  경기전: '경기전',
  전반전: '전반전',
  후반전: '후반전',
  승부차기: '승부차기',
  '경기 종료': '경기 종료',
  연장전: '연장전',
} as const;

export type QuarterType = keyof typeof quarterOptions;

export const roundOptions = [
  { value: '32', label: '32강', basketballLabel: '예선', round: 32 },
  { value: '16', label: '16강', basketballLabel: '16강', round: 16 },
  { value: '8', label: '8강', basketballLabel: '8강', round: 8 },
  { value: '4', label: '4강', basketballLabel: '4강', round: 4 },
  { value: '2', label: '결승', basketballLabel: '결승', round: 2 },
] as const;

export const getRoundOptions = (sportType: 'SOCCER' | 'BASKETBALL') =>
  roundOptions.map((item) => ({
    value: item.value,
    label: sportType === 'BASKETBALL' ? item.basketballLabel : item.label,
    round: item.round,
  }));

export const getRoundLabel = (round: number, sportType: 'SOCCER' | 'BASKETBALL') => {
  const option = roundOptions.find((item) => item.round === round);
  if (!option) return `${round}강`;
  return sportType === 'BASKETBALL' ? option.basketballLabel : option.label;
};

export const stateOptions = {
  PLAYING: '진행 중',
  SCHEDULED: '시작 전',
  FINISHED: '종료',
} as const;
