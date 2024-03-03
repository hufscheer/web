import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

const wrapperBase = style({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: rem(11),
  gap: rem(4),
});

export const wrapper = styleVariants({
  left: [wrapperBase],
  right: [wrapperBase, { flexDirection: 'row-reverse' }],
});

export const teamLogo = style({
  userSelect: 'none',
  alignSelf: 'center',
});

export const content = style({
  padding: `${rem(8)} ${rem(12)}`,
  borderRadius: rem(15),
  backgroundColor: '#F2F2F7',
  ...theme.textVariants.xs,
});

export const blockedContent = style([content, { marginBottom: rem(11) }]);

const infoContainerBase = style({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.gray[4],
  gap: rem(2),
});

export const infoContainer = styleVariants({
  left: [infoContainerBase],
  right: [infoContainerBase, { flexDirection: 'row-reverse' }],
});

export const time = style({
  fontSize: rem(8),
});

export const menuButton = style({
  display: 'flex',
  alignItems: 'flex-end',
});

export const menuButtonIcon = style({
  width: rem(8),
  height: rem(8),
  color: theme.colors.gray[4],
});
