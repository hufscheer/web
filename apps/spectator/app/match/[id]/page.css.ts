import { style, styleVariants } from '@vanilla-extract/css';

const contentSection = style({ overflowY: 'auto', padding: '1.25rem' });

export const timelineSection = contentSection;

export const cheerTalkSection = styleVariants({
  div: [
    contentSection,
    {
      maxHeight: 450,
    },
  ],
  ul: {
    paddingBottom: '2.5rem',
  },
});

export const videoSection = contentSection;
