import { rem, theme } from '@hcc/styles';
import { breakpoint } from '@hcc/styles/dist/responsive.css';
import { style } from '@vanilla-extract/css';

export const scrollArea = style({
  height: '9999px',
});

export const content = style({
  width: '100%',
  height: 'calc(100dvh - 15%)',
  margin: '0 auto',

  ...breakpoint('tablet', {
    width: theme.sizes.appWidth,
  }),
});

export const innerContent = style({
  width: `min(${theme.sizes.appWidth}, 100%)`,
  height: '100%',
  margin: '0 auto',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  flexDirection: 'row',

  width: '100%',
  paddingTop: rem(32),
});

export const headerInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

export const title = style({
  fontSize: rem(24),
  fontWeight: 600,
  color: theme.colors.gray900,

  marginBottom: rem(8),
});

export const description = style({
  fontSize: rem(16),
  color: theme.colors.gray400,
});

export const editButton = style({
  color: theme.colors.gray300,
  fontSize: rem(18),

  ':hover': {
    color: theme.colors.gray500,
  },

  ':focus-visible': {
    color: theme.colors.gray500,
  },
});

export const block = style({
  width: theme.sizes.appWidth,
  paddingInline: theme.sizes.appInlinePadding,
});

export const division = style({
  marginTop: rem(24),
  marginBottom: rem(16),

  fontSize: rem(16),
  fontWeight: 500,
  color: theme.colors.gray900,
});

export const playerList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(16),

  width: '100%',
  marginBottom: rem(24),
});

export const playerItem = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: `1fr ${rem(72)} auto`,
  gap: rem(8),

  width: '100%',
  height: rem(60),
});

export const card = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),

  height: '100%',
  color: theme.colors.gray900,
  paddingInline: rem(18),
  borderRadius: rem(8),
  border: `1px solid ${theme.colors.gray25}`,
  backgroundColor: theme.colors.white,
});

export const backNumber = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  height: '100%',
  color: theme.colors.gray900,
  paddingInline: rem(18),
  borderRadius: rem(8),
  border: `1px solid ${theme.colors.gray25}`,
  backgroundColor: theme.colors.white,
});

export const divider = style({
  backgroundColor: theme.colors.gray25,
  width: '100%',
  padding: 0,
});
