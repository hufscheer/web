import { Slot } from '@radix-ui/react-slot';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { match } from 'ts-pattern';
import { colors } from '../token';
import styles from './Spinner.module.css';

type SpinnerSize = 'xl' | 'lg' | 'md' | 'sm';

type SpinnerColor = 'primary' | 'neutral' | 'white';

export interface SpinnerProps extends Omit<ComponentPropsWithoutRef<'div'>, 'size' | 'color'> {
  asChild?: boolean;
  size?: SpinnerSize;
  color?: SpinnerColor;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ asChild, size = 'md', color = 'primary', className, style: _style, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    const style = {
      ..._style,
      '--hcc-spinner-size': `${getSize(size)}px`,
      '--hcc-spinner-border-width': `${getBorderWidth(size)}px`,
      '--hcc-spinner-border-color': getBorderColor(color),
      '--hcc-spinner-bg-color': getBackgroundColor(color),
    };

    return <Comp ref={ref} className={styles.spinner} style={style} {...props} />;
  },
);

const getSize = (size: SpinnerSize) =>
  match(size)
    .with('xl', () => 40)
    .with('lg', () => 32)
    .with('md', () => 24)
    .with('sm', () => 20)
    .exhaustive();

const getBorderWidth = (size: SpinnerSize) =>
  match(size)
    .with('xl', () => 5)
    .with('lg', () => 4)
    .with('md', () => 3)
    .with('sm', () => 3)
    .exhaustive();

const getBorderColor = (color: SpinnerColor) =>
  match(color)
    .with('primary', () => colors.primary600)
    .with('neutral', () => colors.neutral600)
    .with('white', () => colors.white)
    .exhaustive();

const getBackgroundColor = (color: SpinnerColor) =>
  match(color)
    .with('primary', () => colors.primary200)
    .with('neutral', () => colors.neutral200)
    .with('white', () => colors.whiteAlpha30)
    .exhaustive();
