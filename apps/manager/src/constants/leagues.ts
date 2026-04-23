import type { SportType } from '~/api/types';

import { getSportConfig } from './sports';

export const getQuarterOptions = (sportType: SportType) => getSportConfig(sportType).quarters;

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
  { value: '100', label: '예선', round: 100 },
  { value: '16', label: '16강', round: 16 },
  { value: '8', label: '8강', round: 8 },
  { value: '4', label: '4강', round: 4 },
  { value: '2', label: '결승', round: 2 },
] as const;

export const getRoundOptions = (sportType: SportType) => {
  const config = getSportConfig(sportType);
  return roundOptions.map((item) => ({
    value: item.value,
    label: config.roundLabels[item.round] ?? item.label,
    round: item.round,
  }));
};

export const getRoundLabel = (round: number, sportType: SportType) => {
  const config = getSportConfig(sportType);
  return config.roundLabels[round] ?? `${round}강`;
};

export const getStarterLimit = (sportType: SportType) => getSportConfig(sportType).starterLimit;

export const stateOptions = {
  PLAYING: '진행 중',
  SCHEDULED: '시작 전',
  FINISHED: '종료',
} as const;
