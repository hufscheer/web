import { theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const title = style({
  marginTop: theme.spaces.default,
  ...theme.textVariants.default,
  color: theme.colors.gray[4],
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spaces.sm,
});

export const card = styleVariants({
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: theme.spaces.xxs,
  },
  menu: {},
});

export const caption = style({
  marginTop: theme.spaces.xs,
  ...theme.textVariants.xs,
  color: theme.colors.gray[3],
  textAlign: 'center',
});
