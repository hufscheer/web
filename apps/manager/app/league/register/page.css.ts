import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  height: '100%',
  paddingInline: theme.sizes.appInlinePadding,
  paddingTop: theme.sizes.appInlinePadding,
});

export const form = style({
  ...theme.layouts.column,
  gap: rem(12),
  flex: 1,
});

export const button = style({
  marginTop: rem(6),
});

export const tipBox = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: 'calc(var(--vw, 1vw) * 100)',
  backgroundColor: theme.colors.tips,
});

export const tipInner = style({
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  paddingBlock: rem(26),
  paddingInline: rem(39),
  marginInline: 'auto',
});

export const tipTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(6),

  fontWeight: 600,
  marginBottom: rem(8),
});

export const tipDescription = style({
  fontSize: rem(14),
  color: theme.colors.black300,
  wordBreak: 'keep-all',
});
