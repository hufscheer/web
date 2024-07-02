import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const loginLayout = style({
  display: 'flex',
  height: '100%',
  paddingInline: rem(21),
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBlock: rem(26),
  paddingInline: rem(5),
});

export const branding = style({
  fontSize: rem(24),
  fontWeight: '600',
  lineHeight: '110%',
});

export const tag = style({
  height: 'fit-content',
  paddingBlock: rem(6),
  paddingInline: theme.spaces.xs,
  color: '#007AFF',
  fontSize: rem(14),
  fontWeight: '600',
  borderRadius: rem(8),
  backgroundColor: '#F2F8FF',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: rem(45),
  gap: rem(16),
});

export const submitButton = style({
  marginTop: rem(8),
});
