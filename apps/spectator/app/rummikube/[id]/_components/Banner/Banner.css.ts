import { theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

import {
  errorFallback as ogErrorFallback,
  gameBanner as ogGameBanner,
  skeleton as ogSkeleton,
} from '@/components/game/Banner/Banner.css';

export const base = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const rkGameBanner = styleVariants({
  frame: [ogGameBanner.frame],
  label: [ogGameBanner.label],
  cardWrapper: [ogGameBanner.cardWrapper],
  background: { height: 180, zIndex: 0, color: theme.colors.primary[3] },
  status: { marginTop: '1.25rem', color: 'black' },
  teamWrapper: [
    base,
    {
      zIndex: 10,
      gap: '1.75rem',
    },
  ],
  teamArea: [
    base,
    {
      flexDirection: 'column',
    },
  ],
  team: [
    base,
    {
      flexDirection: 'column',
    },
  ],
});

export const errorFallback = ogErrorFallback;

export const skeleton = ogSkeleton;
