import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  position: 'relative',
  paddingInline: theme.spaces.default,
  paddingBlock: theme.spaces.xs,
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.colors.gray[3],
});

export const logoContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xs,
});

export const subtitle = style({
  alignSelf: 'end',
  ...theme.textVariants.default,
  color: theme.colors.black,
  fontWeight: 'bold',
});
