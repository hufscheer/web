import { toSportType } from '~/utils/sport';

export const SPORT_SLUG = 'basketball' as const;
export const SPORT_TYPE = toSportType(SPORT_SLUG);
