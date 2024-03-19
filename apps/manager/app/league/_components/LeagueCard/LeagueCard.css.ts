import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.xxs,
  flex: 1,
});

export const title = style({
  marginTop: theme.spaces.lg,
  marginBottom: theme.spaces.sm,

  ...theme.textVariants.default,
  color: theme.colors.gray[4],
});

export const caret = style({
  transform: 'rotate(-90deg)',
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

export const leagueName = style({
  ...theme.textVariants.default,
});

export const leagueDate = style({
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
