import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: 'calc(var(--vw, 1vw) * 100)',
  backgroundColor: theme.colors.tips,
});

export const innerContainer = style({
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  paddingBlock: rem(26),
  paddingInline: rem(39),
  marginInline: 'auto',
});

export const title = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(6),

  fontWeight: 600,
  marginBottom: rem(8),
});

export const description = style({
  fontSize: rem(14),
  color: theme.colors.black300,
  wordBreak: 'keep-all',
});
