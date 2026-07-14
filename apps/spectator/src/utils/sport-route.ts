import type { SportType } from '~/api/types';

export const DEFAULT_SPORT: SportType = 'SOCCER';

export const getSportScoreUnit = (sport: SportType) => (sport === 'SOCCER' ? '골' : '점');

export const getSportEmoji = (sport: SportType) => (sport === 'SOCCER' ? '⚽' : '🏀');

export const normalizeSportParam = (sport?: string): SportType | null => {
  if (!sport) return null;
  const normalized = sport.toUpperCase();
  if (normalized === 'SOCCER' || normalized === 'BASKETBALL') {
    return normalized as SportType;
  }
  return null;
};

export const sportToPathSegment = (sport: SportType) => sport.toLocaleLowerCase();

/**
 * `/org/[orgId]/{sport}/...` 형태 URL 에서 sport 세그먼트만 교체한다.
 * org 세그먼트가 없는 경로(e.g. `/welcome`)는 그대로 반환한다.
 */
export const replaceSportInPathname = (pathname: string, sport: SportType) =>
  pathname.replace(
    /^(\/org\/[^/]+\/)(basketball|soccer)(?=\/|$)/,
    `$1${sportToPathSegment(sport)}`,
  );
