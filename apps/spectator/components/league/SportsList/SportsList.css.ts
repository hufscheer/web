import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '@hcc/styles';

const sportsItemBase = style({
  borderRadius: '0.75rem',
  cursor: 'pointer',
});

const sportsItem = styleVariants({
  default: [
    sportsItemBase,
    { color: theme.colors.gray[5], background: theme.colors.gray[2] },
  ],
  selected: [
    sportsItemBase,
    { color: 'white', background: theme.colors.primary[3] },
  ],
});

export const sportsList = styleVariants({
  wrapper: {
    display: 'flex',
    marginBottom: '1.25rem',
    gap: '1rem',
    alignItems: 'center',
    width: '100%',
  },
  item: [sportsItem.default],
  itemFocused: [sportsItem.selected],
  button: {
    display: 'flex',
    padding: '0.75rem 1rem',
    gap: '0.5rem',
    alignItems: 'center',
  },
});

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

export const skeleton = styleVariants({
  ul: {
    display: 'flex',
    overflow: 'hidden',
    marginBottom: '1.25rem',
    gap: '1.25rem',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: '28rem',
    height: '40px',
  },
  li: {
    borderRadius: '0.75rem',
    animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
    cursor: 'pointer',
    height: '40px',
    width: '70px',
    color: theme.colors.gray[5],
    background: theme.colors.gray[2],
  },
});
