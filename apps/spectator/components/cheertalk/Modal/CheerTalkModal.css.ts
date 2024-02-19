import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: theme.sizes.appWidth,
  width: '100%',
  backgroundColor: theme.colors.background.normal,
});

export const timeline = style({
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
    padding: `${rem(16)} ${rem(16)} 0 ${rem(16)}`,
    overflowY: 'auto',
  },
]);
