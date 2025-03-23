import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
});

export const timeline = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spaces.xs,
  gap: theme.spaces.lg,
  width: '100%',
});

export const timestamp = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: rem(4),
  padding: `${rem(2)} ${rem(4)}`,
  ...theme.textVariants.xs,
  fontWeight: 600,
  color: theme.colors.gray[6],
  backgroundColor: theme.colors.gray[2],
});

export const scoreTimeline = styleVariants({
  left: [
    timeline,
    {
      backgroundColor: theme.colors.indicatorBlue[3],
      color: theme.colors.white,
    },
  ],
  right: [
    timeline,
    {
      backgroundColor: theme.colors.indicatorRed[3],
      color: theme.colors.white,
    },
  ],
});

export const rightSide = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xs,
});

export const content = styleVariants({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.xxs,
  },
  title: {
    fontSize: theme.textVariants.xs.fontSize,
  },
  descriptionArea: {
    fontSize: theme.textVariants.xxs.fontSize,
  },
  scoreArea: {
    marginInline: theme.spaces.xxs,
  },
});
