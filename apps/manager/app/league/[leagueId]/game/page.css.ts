import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const createButton = style({
  display: 'flex',
  height: 'fit-content',
  paddingBlock: theme.spaces.sm,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: rem(10),
  backgroundColor: theme.colors.white,
  ...theme.textVariants.default,
  color: theme.colors.primary[3],
  transition: 'background-color 0.2s',

  ':hover': {
    backgroundColor: theme.colors.gray[2],
    color: theme.colors.primary[3],
  },
});

export const title = style({
  marginTop: theme.spaces.lg,
  ...theme.textVariants.default,
  color: theme.colors.gray[4],
  fontWeight: '600',
});

export const modalContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: calc.divide(theme.sizes.appWidth, 1.5),
  marginInline: 'auto',
  paddingInline: theme.spaces.default,
});

export const modalContent = style({
  width: '100%',
  paddingBlock: theme.spaces.sm,
  paddingInline: theme.spaces.lg,
  borderRadius: rem(12),
  backgroundColor: theme.colors.gray[1],
  ...theme.textVariants.default,
  fontWeight: 'normal',
});

export const gameName = style({
  ...theme.textVariants.default,
});

export const gameDate = style({
  ...theme.textVariants.xs,
  color: theme.colors.gray[4],
});

export const alert = style([
  modalContent,
  {
    paddingBlock: theme.spaces.lg,
    marginTop: theme.spaces.xxs,
    textAlign: 'center',
  },
]);

export const menuContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spaces.default,
  gap: theme.spaces.default,
});

export const positiveMenu = style({
  width: '100%',
  display: 'flex',
  paddingBlock: theme.spaces.sm,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: rem(8),
  backgroundColor: theme.colors.indicatorBlue['3'],

  ...theme.textVariants.xs,
  color: theme.colors.white,
  fontWeight: 'bold',
});

export const negativeMenu = style([
  positiveMenu,
  {
    color: theme.colors.indicatorRed['3'],
    border: `${rem(1)} solid ${theme.colors.gray[4]}`,
    backgroundColor: theme.colors.white,
  },
]);
