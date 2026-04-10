'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

import type { SportType } from '~/api/types';

const SPORT_TYPES = ['SOCCER', 'BASKETBALL'] as const satisfies readonly SportType[];

export const useSportType = () => {
  const [sport, setSport] = useQueryState(
    'sport',
    parseAsStringLiteral([...SPORT_TYPES])
      .withDefault('SOCCER')
      .withOptions({ clearOnDefault: false }),
  );

  return { sport: sport as SportType, setSport };
};
