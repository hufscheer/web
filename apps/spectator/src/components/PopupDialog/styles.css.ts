import { rem, theme } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  padding: `0 !important`,
  overflow: 'hidden',
});

export const image = style({
  width: '100%',
  position: 'relative',
  height: 'auto',
  userSelect: 'none',
});

globalStyle(`${image} > img`, {
  width: '100%',
  height: 'auto',
  userSelect: 'none',
});

export const buttonContainer = style({
  ...theme.layouts.rowBetween,
  paddingBlock: rem(8),
  paddingInline: rem(16),
});

export const button = style({
  fontSize: rem(14),
  fontWeight: 500,
});
