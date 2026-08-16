import type { SportType } from '~/api/types';

export const SPORT_SLUGS = ['soccer', 'basketball'] as const;
export type SportSlug = (typeof SPORT_SLUGS)[number];

export const DEFAULT_SPORT: SportSlug = 'soccer';

const SLUG_TO_TYPE = {
  soccer: 'SOCCER',
  basketball: 'BASKETBALL',
} as const satisfies Record<SportSlug, SportType>;

const TYPE_TO_SLUG = {
  SOCCER: 'soccer',
  BASKETBALL: 'basketball',
} as const satisfies Record<SportType, SportSlug>;

export const isSportSlug = (value: string): value is SportSlug =>
  (SPORT_SLUGS as readonly string[]).includes(value);

export const toSportType = (slug: SportSlug): SportType => SLUG_TO_TYPE[slug];

export const toSportSlug = (type: SportType): SportSlug => TYPE_TO_SLUG[type];
