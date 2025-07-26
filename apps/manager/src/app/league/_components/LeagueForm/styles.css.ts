import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  ...theme.layouts.column,
  paddingInline: theme.sizes.appInlinePadding,
  paddingTop: theme.sizes.appInlinePadding,
  gap: rem(22),
  flex: 1,
  position: 'relative',
});

export const button = style({
  marginTop: rem(6),
  ':disabled': {
    backgroundColor: theme.colors.gray300,
    color: theme.colors.gray100,
    cursor: 'not-allowed',
  },
  width: '100%',
  fontWeight: 700,
  fontSize: rem(17),
  borderRadius: rem(8),
  padding: `${rem(14)} 0`,
  transition: 'background 0.2s, color 0.2s',
});
export const subButton = style({
  marginTop: rem(6),
  ':disabled': {
    backgroundColor: theme.colors.blue200,
    color: theme.colors.blue600,
    cursor: 'not-allowed',
  },
  backgroundColor: theme.colors.blue200,
  color: theme.colors.blue600,
  alignSelf: 'center',
  justifySelf: 'center',
  width: '48%',
  minWidth: rem(120),
  maxWidth: rem(220),
  border: 'none',
  fontWeight: 600,
  fontSize: rem(16),
  borderRadius: rem(8),
  boxShadow: 'none',
  padding: `${rem(12)} 0`,
  transition: 'background 0.2s, color 0.2s',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '100%',
      minWidth: 'unset',
      maxWidth: 'unset',
      fontSize: rem(15),
      padding: `${rem(10)} 0`,
    },
  },
});

export const buttonContainer2 = style({
  display: 'flex',
  flexDirection: 'row',
  gap: rem(12),
  justifyContent: 'center',
  alignSelf: 'center',
  width: '100%',
  marginBottom: rem(12),
  position: 'sticky',
  bottom: rem(100),
  zIndex: 1000,
  background: 'white',
  padding: `${rem(8)} 0`,
  '@media': {
    'screen and (max-width: 600px)': {
      flexDirection: 'column',
      gap: rem(8),
      bottom: rem(10),
      padding: `${rem(4)} 0`,
    },
  },
});
export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(12),
  alignSelf: 'center',
  width: '100%',
  marginBottom: rem(8),
  '@media': {
    'screen and (max-width: 600px)': {
      gap: rem(8),
      marginBottom: rem(4),
    },
  },
});

export const progressFirst = style({
  ...theme.layouts.column,
  gap: rem(12),
  flex: 1,
  fontWeight: 600,
  color: theme.colors.gray800,
});

export const progressFirstTitle = style({
  fontSize: rem(18),
  fontWeight: 700,
});
export const scrollArea = style({
  height: '80vh',
  overflowY: 'auto',
});

export const progressBar = style({
  display: 'flex',
  flexDirection: 'row',
  gap: rem(12),
  position: 'relative',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  justifySelf: 'center',
});
