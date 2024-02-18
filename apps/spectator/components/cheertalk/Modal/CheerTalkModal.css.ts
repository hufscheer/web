import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const cheerTalkModalWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: theme.sizes.appWidth,
  backgroundColor: theme.colors.background.normal,
});

export const cheerTalkModalHeader = style({
  position: 'relative',
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.primary[1],
});

export const cheerTalkModalTimeline = style({
  display: 'flex',
  flexShrink: 0,
  height: rem(42),
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
});

export const cheerTalkListContainer = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: 'hidden',
});

export const cheerTalkList = style([
  cheerTalkListContainer,
  {
    padding: `0 ${rem(16)}`,
    overflowY: 'auto',
  },
]);
