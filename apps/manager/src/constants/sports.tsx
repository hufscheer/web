import type { ComponentType } from 'react';

import { BasketballIcon, SportsAndOutdoorsIcon } from '@hcc/icons';

import type { SportType } from '~/api/types';

type IconProps = { size?: number; className?: string };

type SportConfig = {
  icon: ComponentType<IconProps>;
  label: string;
  starterLimit: number;
  quarters: Record<string, string>;
  roundLabels: Record<number, string>;
};

const SPORT_CONFIGS: Record<SportType, SportConfig> = {
  SOCCER: {
    icon: SportsAndOutdoorsIcon,
    label: '축구',
    starterLimit: 11,
    quarters: {
      PRE_GAME: '경기 전',
      FIRST_HALF: '전반전',
      SECOND_HALF: '후반전',
      EXTRA_TIME: '연장전',
      PENALTY_SHOOTOUT: '승부차기',
      POST_GAME: '경기 후',
    },
    roundLabels: { 100: '예선', 16: '16강', 8: '8강', 4: '준결승', 2: '결승' },
  },
  BASKETBALL: {
    icon: BasketballIcon,
    label: '농구',
    starterLimit: 5,
    quarters: {
      PRE_GAME: '경기 전',
      FIRST_QUARTER: '1쿼터',
      SECOND_QUARTER: '2쿼터',
      THIRD_QUARTER: '3쿼터',
      FOURTH_QUARTER: '4쿼터',
      OVERTIME: '연장전',
      POST_GAME: '경기 후',
    },
    roundLabels: { 100: '예선', 16: '16강', 8: '8강', 4: '준결승', 2: '결승' },
  },
};

export const getSportConfig = (sportType: SportType) => SPORT_CONFIGS[sportType];

export const SportIcon = ({ sportType, size = 16 }: { sportType: SportType; size?: number }) => {
  const Icon = SPORT_CONFIGS[sportType].icon;
  return <Icon size={size} />;
};
