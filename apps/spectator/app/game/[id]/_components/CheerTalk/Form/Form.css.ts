import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: rem(16),
  paddingTop: rem(8),
  gap: rem(8),
});

export const radioBox = style({
  display: 'flex',
  gap: rem(4),
});

export const radioField = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(4),
  cursor: 'pointer',
  ...theme.textVariants.sm,
});

export const radioInput = style({
  width: rem(12),
  height: rem(12),
  border: 'none',
  borderRadius: '50%',
  backgroundColor: theme.colors.gray[2],
  boxShadow: `0 0 0 ${rem(1)} ${theme.colors.gray[3]}`,
  selectors: {
    '&:checked': {
      border: `${rem(2)} solid ${theme.colors.gray[2]}`,
      backgroundColor: theme.colors.indicatorBlue[3],
    },
  },
});

export const cheerTalkInputContainer = style({
  display: 'flex',
  gap: rem(8),
  alignItems: 'center',
});

export const cheerTalkInput = style({
  flex: '1',
  padding: `${theme.spaces.sm} ${theme.spaces.default}`,
  color: theme.colors.gray[4],
  borderRadius: rem(12),
  backgroundColor: theme.colors.gray[1],
  ...theme.textVariants.default,
});

export const cheerTalkSendButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const cheerTalkSendIcon = style({
  width: rem(24),
  height: rem(24),
  color: theme.colors.secondary[2],
});

export const scrollToBottomButton = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: rem(2),
  right: rem(10),
  width: rem(32),
  height: rem(32),
  borderRadius: '50%',
  backgroundColor: theme.colors.gray[2],
});
