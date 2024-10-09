import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

import { skeletonAnimation } from '@/styles/animations.css';

export const root = style({
  display: 'flex',
  justifyContent: 'space-between',

  paddingInline: theme.spaces.default,
  margin: `${rem(34)} ${rem(36)} 0`,

  ...theme.textVariants.xs,
});

export const team = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spaces.xs,

  flexShrink: 0,
});

export const logo = style({
  width: rem(66),
  height: rem(66),
  objectFit: 'cover',
  border: `1px solid ${theme.colors.gray50}`,
  borderRadius: '50%',
});

export const teamName = style({
  fontWeight: 500,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: rem(66),
});

export const gameInfo = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spaces.xs,
});

export const scoreBoard = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spaces.default,

  height: rem(36),
});

export const score = style({
  color: theme.colors.gray900,
  fontSize: rem(36),
});

export const colon = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const dots = style({
  backgroundColor: theme.colors.gray200,
  color: theme.colors.gray200,
  width: rem(3),
  borderRadius: '50%',
  aspectRatio: '1/1',
});

export const badge = style({
  display: 'flex',
  alignItems: 'center',

  height: rem(24),
  paddingInline: theme.spaces.xs,
  borderRadius: 8,

  color: theme.colors.gray400,
  fontSize: rem(12),
  fontWeight: 600,
  lineHeight: '100%',
  whiteSpace: 'nowrap',
  backgroundColor: theme.colors.gray25,
});

export const badgeActive = style({
  color: theme.colors.white,
  backgroundColor: theme.colors.alert.normal,
});

export const round = style({
  marginBottom: theme.spaces.xxs,
});

export const time = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  color: theme.colors.gray300,
  whiteSpace: 'nowrap',
});

export const skeleton = styleVariants({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: rem(20),

    width: '100%',
    minHeight: rem(95),
    padding: `${theme.spaces.sm} ${theme.spaces.default}`,
    backgroundColor: theme.colors.background.secondary,
  },
  box: [
    skeletonAnimation,
    {
      justifySelf: 'center',

      height: '100%',
      width: '60%',
      backgroundColor: theme.colors.gray100,
      borderRadius: rem(8),
    },
  ],
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rem(8),
  },
  line: [
    skeletonAnimation,
    {
      backgroundColor: theme.colors.gray100,
      borderRadius: rem(8),
    },
  ],
});

export const errorFallback = styleVariants({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: rem(95),
  },
  message: {
    color: theme.colors.gray500,
    ...theme.textVariants.sm,

    fontWeight: 500,
    textAlign: 'center',
  },
});
