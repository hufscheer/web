import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.default,

  position: 'fixed',
  top: 0,
  right: 0,

  width: 300,
  height: '100vh',

  paddingInline: theme.spaces.default,

  backgroundColor: theme.colors.white,
  borderRadius: 0,
});

export const sidebarHeader = style({
  position: 'relative',

  ...theme.textVariants.default,
  paddingBlock: theme.spaces.default,
  borderBottom: `1px solid ${theme.colors.gray[2]}`,
});

export const openIconButton = style({
  display: 'flex',
  alignItems: 'center',
});

export const close = style({
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
});
