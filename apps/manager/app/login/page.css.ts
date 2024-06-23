import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

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
