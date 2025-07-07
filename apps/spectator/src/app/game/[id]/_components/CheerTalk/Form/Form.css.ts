import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: `${rem(8)} ${rem(16)}`,
  gap: rem(8),
});

export const radioBox = style({
  display: 'flex',
  gap: rem(4),
  outline: 'none',
  border: 'none',
});

export const radioField = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(4),
  cursor: 'pointer',
  border: 'none',
  ...theme.textVariants.sm,

  selectors: {
    '&:has(input:disabled)': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

export const radioInput = style({
  width: rem(12),
  height: rem(12),
  outline: 'none',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: theme.colors.gray100,
  selectors: {
    '&:checked': {
      border: `${rem(2)} solid ${theme.colors.gray100}`,
      backgroundColor: theme.colors.primary.normal,
    },
  },
});

export const cheerTalkInputContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.default,
});

export const inputWrapper = style({
  flex: '1',
  borderRadius: rem(12),
  backgroundColor: theme.colors.gray50,
});

export const cheerTalkInput = style({
  width: '100%',
  paddingBlock: theme.spaces.sm,
  color: theme.colors.gray300,
  ...theme.textVariants.default,
  transform: 'scale(0.9)',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
      color: theme.colors.gray400,
    },
  },
});

export const cheerTalkSendButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});
