import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const CheerTalkModalWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: theme.sizes.appWidth,
  backgroundColor: theme.colors.background.normal,
});

export const CheerTalkModalHeader = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.primary[1],
});

export const CheerTalkModalTimeline = style({
  display: 'flex',
  minHeight: rem(36),
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
});
