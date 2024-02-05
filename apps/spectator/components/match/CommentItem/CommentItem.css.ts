import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '@hcc/styles';

const base = style({
  borderRadius: '0.75rem',
  borderWidth: 1,
  background: theme.colors.gray[2],
  padding: '0.25rem 0.75rem',
});

export const blocked = base;

const wrapperBase = style({
  marginBottom: '0.25rem',
  display: 'flex',
  alignItems: 'flex-end',
});

export const wrapper = styleVariants({
  odd: [wrapperBase],
  even: [wrapperBase, { flexDirection: 'row-reverse' }],
});

export const content = styleVariants({
  0: [base, { background: '#ffb2b2' }],
  1: [base, { background: '#b2c3ff' }],
  2: [base, { background: '#fdd3b1' }],
  3: [base, { background: '#a6e7be' }],
});

export type Content = keyof typeof content;

const infoWrapperBase = style([
  wrapperBase,
  {
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
]);

export const infoWrapper = styleVariants({
  odd: [infoWrapperBase],
  even: [infoWrapperBase, { flexDirection: 'row-reverse' }],
});

const timeBase = style({
  width: 'max-content',
  padding: '0 0.5rem',
  color: theme.colors.gray[4],
});

export const time = styleVariants({
  odd: [
    timeBase,
    {
      borderRightWidth: 1,
    },
  ],
  even: [
    timeBase,
    {
      borderLeftWidth: 1,
    },
  ],
});

export const button = style({
  margin: '0 0.5rem',
  width: 'max-content',
  color: theme.colors.indicatorRed[2],
});
