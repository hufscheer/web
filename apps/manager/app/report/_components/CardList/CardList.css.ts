import { theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const title = style({
  ...theme.textVariants.sm,
  color: theme.colors.gray[4],
  fontWeight: '600',
});

export const wrapper = style({
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
  menu: {
    display: 'flex',
    gap: theme.spaces.xs,
  },
});

export const caption = style({
  marginTop: theme.spaces.xs,
  ...theme.textVariants.xs,
  color: theme.colors.gray[3],
  textAlign: 'center',
});
