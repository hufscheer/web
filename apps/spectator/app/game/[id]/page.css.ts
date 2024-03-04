import { theme } from '@hcc/styles';
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
