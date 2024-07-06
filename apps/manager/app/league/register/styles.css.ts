import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',

  height: '100%',
  paddingInline: theme.sizes.appInlinePadding,
  paddingTop: theme.sizes.appInlinePadding,
});

export const button = style({
  marginTop: rem(18),
});

export const tipBox = style({
  backgroundColor: '#FBFBFC',

  paddingBlock: rem(26),
  paddingInline: rem(39),
});

export const tipTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(6),

  fontWeight: 'bold',
  marginBottom: rem(8),
});

export const emoji = style({
  fontSize: rem(14),
});

export const tipDescription = style({
  fontSize: rem(14),
  color: theme.colors.black300,
});
