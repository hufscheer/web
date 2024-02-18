import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const cheerTalkEntryContainer = style({
  position: 'fixed',
  bottom: rem(16),
  right: rem(16),
});

export const cheerTalkEntryButtonContent = style({
  display: 'flex',
  minWidth: rem(120),
  justifyContent: 'flex-end',
});

export const cheerTalkEntryButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: rem(40),
  height: rem(40),
  border: `${rem(1)} solid ${theme.colors.gray[2]}`,
  borderRadius: '50%',
  backgroundColor: theme.colors.primary[3],
});

export const cheerTalkEntryButtonIcon = style({
  width: rem(18),
  height: rem(18),
});
