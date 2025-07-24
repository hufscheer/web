import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const teamsSection = style({
  background: '#f7f7f7',
  borderRadius: rem(8),
  padding: rem(16),
  marginBottom: rem(16),
});

export const TeamsTitle = style({
  fontWeight: 700,
  fontSize: rem(16),
  marginBottom: rem(12),
});

export const teamsBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(12),
  position: 'relative',
});

export const teamRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(8),
});

export const teamSelect = style({
  flex: 1,
});

export const LineupButton = style({
  minWidth: rem(110),
  padding: '5px',
  height: '40px',
  display: 'flex',
  position: 'absolute',
  right: '5px',
  alignItems: 'right',
  justifyContent: 'center',
  selectors: {
    '&:disabled': {
      backgroundColor: theme.colors.gray300,
      color: theme.colors.gray100,
      cursor: 'not-allowed',
    },
  },
});
