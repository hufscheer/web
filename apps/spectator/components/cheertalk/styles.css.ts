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
  backgroundColor: 'red',
  border: `${rem(1)} solid`,
  borderColor: theme.colors.gray[2],
  borderRadius: '50%',
});
