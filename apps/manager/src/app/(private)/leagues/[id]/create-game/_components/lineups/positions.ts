import type { SportType } from '~/api';

export type PositionGroup = {
  code: string;
  subs: string[];
};

const SOCCER_POSITIONS: PositionGroup[] = [
  { code: 'FW', subs: ['LW', 'ST', 'RW'] },
  { code: 'MF', subs: ['LM', 'CM', 'RM'] },
  { code: 'DF', subs: ['LB', 'CB', 'RB'] },
  { code: 'GK', subs: ['GK'] },
];

const BASKETBALL_POSITIONS: PositionGroup[] = [
  { code: 'G', subs: ['PG', 'SG'] },
  { code: 'F', subs: ['PF', 'SF'] },
  { code: 'C', subs: ['C'] },
];

export const getPositionGroups = (sportType: SportType): PositionGroup[] =>
  sportType === 'BASKETBALL' ? BASKETBALL_POSITIONS : SOCCER_POSITIONS;

export const findGroupBySub = (
  sportType: SportType,
  value: string | null,
): PositionGroup | undefined => {
  if (!value) return undefined;
  return getPositionGroups(sportType).find((g) => g.code === value || g.subs.includes(value));
};
