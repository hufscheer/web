import { rem } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const badge = style({
  backgroundColor: '#C1C5CA',
  paddingBlock: `${rem(7)} !important`,
  paddingInline: `${rem(6)} !important`,
});

export const modifyBadge = style({
  backgroundColor: '#C1C5CA !important',
});
