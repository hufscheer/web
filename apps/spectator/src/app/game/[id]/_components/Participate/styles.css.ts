import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1px 1fr',
  paddingBlock: theme.spaces.default,
  paddingInline: rem(56),
  marginTop: rem(20),
  gap: rem(36),
});

export const teamContainer = style({
  ...theme.layouts.column,
  gap: rem(26),
});

export const divider = style({
  flexShrink: 0,

  width: 1,
  backgroundColor: theme.colors.gray50,
});

export const itemsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.default,
});

const teamBase = style({
  ...theme.layouts.centerY,
  gap: rem(6),
});

export const team = styleVariants({
  left: [teamBase],
  right: [teamBase, { justifyContent: 'flex-end' }],
});

export const teamNameBase = style({
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 600,
  textWrap: 'pretty',
  wordBreak: 'keep-all',
});

export const teamName = styleVariants({
  left: [teamNameBase],
  right: [teamNameBase, { textAlign: 'end' }],
});

export const playerItem = styleVariants({
  left: [{ ...theme.layouts.centerY }],
  right: [{ ...theme.layouts.centerY }, { flexDirection: 'row-reverse' }],
});

export const playerNameBase = style({
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

export const playerName = styleVariants({
  left: [playerNameBase, { marginRight: theme.spaces.xxs }],
  right: [playerNameBase, { marginLeft: theme.spaces.xxs }],
});

const backNumberBase = style({
  ...theme.layouts.center,
  backgroundColor: theme.colors.white,

  fontSize: rem(12),
  fontWeight: 600,

  width: rem(26),
  aspectRatio: '1/1',
  borderRadius: rem(8),
  fontSizeAdjust: 'from-font',
});

export const backNumber = styleVariants({
  left: [
    backNumberBase,
    {
      marginRight: theme.spaces.xs,
      color: theme.colors.gray900,
      backgroundColor: 'rgba(0, 47, 60, 8%)',
    },
  ],
  right: [
    backNumberBase,
    {
      marginLeft: theme.spaces.xs,
      color: 'rgba(156, 23, 20)',
      backgroundColor: 'rgba(156, 23, 20, 8%)',
    },
  ],
});

export const logoContainer = style({
  width: rem(28),
  height: rem(28),
  position: 'relative',
  flexShrink: 0,
});

export const logoImg = style({
  border: `1px solid ${theme.colors.gray50}`,
  borderRadius: '50%',
  objectFit: 'cover',
});
