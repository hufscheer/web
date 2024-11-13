import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const list = styleVariants({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: `${rem(16)} ${rem(16)} 0 ${rem(16)}`,
    overflowY: 'auto',
  },
});

export const emptyMsg = style({
  display: 'flex',
  flex: 1,
  fontSize: theme.textVariants.default.fontSize,
  alignItems: 'center',
  justifyContent: 'center',
});

export const scrollToBottomButton = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bottom: rem(80),
  right: rem(10),
  width: rem(32),
  height: rem(32),
  borderRadius: '50%',
  backgroundColor: theme.colors.gray[2],
  boxShadow: `0 1px 4px 0 ${theme.colors.gray[4]}`,
  opacity: 0.9,
});

export const scrollToBottomIcon = style({
  width: rem(16),
  height: rem(16),
  color: theme.colors.gray[4],
});
