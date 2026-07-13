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

export const replaceSportInPathname = (pathname: string, sport: SportType) => {
  const segments = pathname.split('/');
  segments[1] = sportToPathSegment(sport);
  return segments.join('/');
};
