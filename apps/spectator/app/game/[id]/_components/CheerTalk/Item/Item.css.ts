import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

const itemBase = style({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: rem(11),
  gap: theme.spaces.xxs,
});

export const itemWrapper = styleVariants({
  left: [
    itemBase,
    {
      paddingRight: theme.spaces.xl,
    },
  ],
  right: [
    itemBase,
    { flexDirection: 'row-reverse', paddingLeft: theme.spaces.xl },
  ],
});

const infoBase = style({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.gray[4],
  gap: rem(2),
});

export const infoContainer = styleVariants({
  left: [infoBase],
  right: [infoBase, { flexDirection: 'row-reverse' }],
});

export const item = styleVariants({
  teamLogo: {
    userSelect: 'none',
    alignSelf: 'center',
  },
  content: {
    padding: `${theme.spaces.xs} ${theme.spaces.sm}`,
    borderRadius: rem(15),
    backgroundColor: '#F2F2F7',
    ...theme.textVariants.xs,
  },
  blocked: {
    color: theme.colors.gray[4],
  },
  timestamp: {
    fontSize: rem(8),
    flexShrink: 0,
  },
  menuButton: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  menuButtonIcon: {
    width: rem(8),
    height: rem(8),
    color: theme.colors.gray[4],
  },
});
