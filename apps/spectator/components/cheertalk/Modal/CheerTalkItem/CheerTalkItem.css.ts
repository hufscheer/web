import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const blocked = style({
  borderRadius: '0.75rem',
  borderWidth: 1,
  background: theme.colors.gray[2],
  padding: '0.25rem 0.75rem',
});

const wrapperBase = style({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: rem(11),
  gap: rem(4),
});

export const wrapper = styleVariants({
  odd: [wrapperBase],
  even: [wrapperBase, { flexDirection: 'row-reverse' }],
});

export const teamLogo = style({
  width: rem(24),
  height: rem(24),
  userSelect: 'none',
  alignSelf: 'center',
});

export const content = style({
  padding: `${rem(8)} ${rem(12)}`,
  borderRadius: rem(15),
  backgroundColor: '#F2F2F7',
  ...theme.textVariants.xs,
});

const infoContainerBase = style({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.gray[4],
  gap: rem(2),
});

export const infoContainer = styleVariants({
  odd: [infoContainerBase],
  even: [infoContainerBase, { flexDirection: 'row-reverse' }],
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
