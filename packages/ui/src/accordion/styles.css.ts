import { theme } from '@hcc/styles';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

export const slideDown = keyframes({
  from: { height: '0' },
  to: { height: 'var(--radix-accordion-content-height)' },
});

export const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: '0' },
});

export const item = style({
  overflow: 'hidden',
});

export const content = style({
  overflow: 'hidden',
});

export const trigger = style({
  ...theme.layouts.rowBetween,
  width: '100%',
});

globalStyle(`${trigger} > svg`, {
  transition: `transform 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
});

globalStyle(`${trigger}[data-state="open"] > svg`, {
  transform: 'rotate(180deg)',
});

globalStyle(`${content}[data-state="open"]`, {
  animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
});

globalStyle(`${content}[data-state="closed"]`, {
  animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
});
