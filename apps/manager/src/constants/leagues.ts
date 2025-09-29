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
  { value: '32', label: '32강', round: 32 },
  { value: '16', label: '16강', round: 16 },
  { value: '8', label: '8강', round: 8 },
  { value: '4', label: '4강', round: 4 },
  { value: '2', label: '결승', round: 2 },
] as const;

export const stateOptions = {
  PLAYING: '진행 중',
  SCHEDULED: '시작 전',
  FINISHED: '종료',
} as const;
