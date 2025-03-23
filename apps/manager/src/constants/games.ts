import { StateType, ProgressType } from '@hcc/api';

export const QUARTERS_DB = {
  경기전: '경기전',
  전반전: '전반전',
  후반전: '후반전',
  승부차기: '승부차기',
  '경기 종료': '경기 종료',
  연장전: '연장전',
} as const;

export const QUARTER_ID: Record<QUARTER_KEY, number> = {
  전반전: 4,
  후반전: 5,
  경기전: 6,
  승부차기: 7,
  '경기 종료': 8,
  연장전: 9,
} as const;

export type QUARTER_KEY = keyof typeof QUARTERS_DB;

export const getStateByQuarter = (quarter: QUARTER_KEY): StateType => {
  if (quarter === '경기전') return 'SCHEDULED';
  if (quarter === '경기 종료') return 'FINISHED';

  return 'PLAYING';
};

export const getProgressTypeByQuarter = (quarter: QUARTER_KEY): ProgressType => {
  const progressMap: Record<QUARTER_KEY, ProgressType> = {
    전반전: 'QUARTER_START',
    후반전: 'QUARTER_START',
    연장전: 'QUARTER_START',
    승부차기: 'QUARTER_START',
    '경기 종료': 'GAME_END',
    경기전: 'GAME_END',
  };

  return progressMap[quarter] || 'GAME_END';
};

export const getProgressSemantics = (progressType: ProgressType): string => {
  switch (progressType) {
    case 'GAME_START':
      return '시작';
    case 'QUARTER_START':
      return '시작';
    case 'QUARTER_END':
      return '종료';
    case 'GAME_END':
      return '종료';
  }
};
