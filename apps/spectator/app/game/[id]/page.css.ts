import { theme, rem } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

const contentSection = style({ overflowY: 'auto', padding: '1.25rem' });

export const timelineSection = contentSection;

export const videoSection = contentSection;

export const cheerTalk = styleVariants({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.xs,

    padding: theme.spaces.default,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spaces.sm,
  },

  title: {
    ...theme.textVariants.lg,
    fontWeight: 'bold',
  },
});

const panelItemBase = style({
  ...theme.textVariants.default,
  textAlign: 'center',
  paddingBlock: rem(12),
  color: theme.colors.gray[4],
  borderBlock: `1px solid ${theme.colors.gray[2]}`,
});

export const panel = styleVariants({
  wrapper: {
    position: 'relative',
  },
  menu: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    width: '100%',
  },
});

export const item = styleVariants({
  active: [
    panelItemBase,
    {
      background: theme.colors.primary[1],
      color: theme.colors.primary[3],
      borderBottom: `1px solid ${theme.colors.primary[3]}`,
    },
  ],
  inactive: [panelItemBase],
});
