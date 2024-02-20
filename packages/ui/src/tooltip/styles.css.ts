import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const tooltipContainer = style({
  position: 'relative',
  display: 'inline-block',
});

export const tooltipContent = style({
  position: 'absolute',
  backgroundColor: 'white',
  color: theme.colors.gray[5],
  borderRadius: '4px',
  padding: '8px',
  zIndex: 1,
  minWidth: rem(120),
  whiteSpace: 'normal',
  wordBreak: 'keep-all',
  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
  ...theme.textVariants.xs,
});

export const tooltipPosition = styleVariants({
  top: {
    bottom: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  right: {
    top: '50%',
    left: '120%',
    transform: 'translateY(-50%)',
  },
  bottom: {
    top: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    top: '50%',
    right: '120%',
    transform: 'translateY(-50%)',
  },
});

export const arrow = style({
  width: 0,
  height: 0,
  position: 'absolute',
  borderStyle: 'solid',
});

export const arrowPosition = styleVariants({
  top: {
    bottom: '-5px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '5px 5px 0',
    borderColor: 'white transparent transparent',
  },
  right: {
    top: '50%',
    left: '-7px',
    transform: 'translateY(-50%) rotate(-90deg)',
    borderWidth: '0 5px 5px',
    borderColor: 'transparent transparent white transparent',
  },
  bottom: {
    top: '-5px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '0 5px 5px',
    borderColor: 'transparent transparent white',
  },
  left: {
    top: '50%',
    right: '-7px',
    transform: 'translateY(-50%) rotate(90deg)',
    borderWidth: '0 5px 5px',
    borderColor: 'transparent transparent white transparent',
  },
});

export const arrowAlign = styleVariants({
  center: {},
  leftStart: { left: '15%' },
  left: { left: '30%' },
  right: { left: '70%' },
  rightEnd: { left: '85%' },
  topStart: { top: '15%' },
  top: { top: '30%' },
  bottom: { top: '70%' },
  bottomEnd: { top: '85%' },
});
