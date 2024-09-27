import { StateType } from '@hcc/api';

export const QUARTERS_DB = {
  '경기 전': '경기전',
  전반전: '전반전',
  후반전: '후반전',
  승부차기: '승부차기',
  '경기 후': '경기후',
} as const;

export const QUARTER_ID: Record<QUARTER_KEY, number> = {
  전반전: 4,
  후반전: 5,
  경기전: 6,
  승부차기: 7,
  경기후: 8,
} as const;

export type QUARTER_KEY = (typeof QUARTERS_DB)[keyof typeof QUARTERS_DB];

export const getStateByQuarter = (quarter: QUARTER_KEY): StateType => {
  if (quarter === '경기전') return 'SCHEDULED';
  if (quarter === '경기후') return 'FINISHED';

  return 'PLAYING';
};
