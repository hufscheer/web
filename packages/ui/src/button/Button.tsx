import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { match } from 'ts-pattern';
import { colors, fontWeight as fontWeightToken } from '../token';
import styles from './Button.module.css';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ButtonColor = 'black' | 'primary' | 'danger';

type ButtonVariant = 'solid' | 'subtle' | 'ghost';

export interface ButtonProps extends ComponentProps<'button'> {
  asChild?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      className,
      children,
      disabled,
      size = 'md',
      color = 'primary',
      variant = 'solid',
      style: _style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const style = {
      ..._style,
      ...getColorStyle(color, variant),
      '--hcc-button-height': `${getHeight(size)}px`,
      '--hcc-button-font-size': `${getFontSize(size)}px`,
      '--hcc-button-font-weight': fontWeightToken[getFontWeight(size)],
      '--hcc-button-border-radius': '8px',
    } as CSSProperties;

    return (
      <Comp
        ref={ref}
        className={clsx(styles.button, disabled && styles.disabled, className)}
        style={style}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

const getHeight = (size: ButtonSize) =>
  match(size)
    .with('xs', () => 28)
    .with('sm', () => 36)
    .with('md', () => 44)
    .with('lg', () => 52)
    .with('xl', () => 60)
    .exhaustive();

const getFontSize = (size: ButtonSize) =>
  match(size)
    .with('xs', () => 12)
    .with('sm', () => 14)
    .with('md', () => 14)
    .with('lg', () => 16)
    .with('xl', () => 18)
    .exhaustive();

const getFontWeight = (size: ButtonSize): keyof typeof fontWeightToken =>
  match(size)
    .with('xs', 'sm', () => 'medium' as const)
    .with('md', 'lg', 'xl', () => 'semibold' as const)
    .exhaustive();

const getColorStyle = (color: ButtonColor, variant: ButtonVariant) => {
  const fontColor = match([color, variant])
    .with(['black', 'solid'], ['primary', 'solid'], ['danger', 'solid'], () => colors.white)
    .with(['black', 'subtle'], ['black', 'ghost'], () => colors.neutral900)
    .with(['primary', 'subtle'], ['primary', 'ghost'], () => colors.primary600)
    .with(['danger', 'subtle'], ['danger', 'ghost'], () => colors.danger600)
    .exhaustive();

  const backgroundColor = match([color, variant])
    .with(['black', 'solid'], () => colors.neutral900)
    .with(['black', 'subtle'], () => colors.neutral50)
    .with(['primary', 'solid'], () => colors.primary600)
    .with(['primary', 'subtle'], () => colors.primary100)
    .with(['danger', 'solid'], () => colors.danger600)
    .with(['danger', 'subtle'], () => colors.danger100)
    .otherwise(() => colors.transparent);

  const backgroundHoverColor = match([color, variant])
    .with(['black', 'solid'], () => colors.neutral700)
    .with(['black', 'subtle'], () => colors.neutral100)
    .with(['black', 'ghost'], () => colors.neutral50)
    .with(['primary', 'solid'], () => colors.primary700)
    .with(['primary', 'subtle'], () => colors.primary200)
    .with(['primary', 'ghost'], () => colors.primary50)
    .with(['danger', 'solid'], () => colors.danger700)
    .with(['danger', 'subtle'], () => colors.danger200)
    .with(['danger', 'ghost'], () => colors.danger50)
    .otherwise(() => colors.transparent);

  return {
    '--hcc-button-font-color': fontColor,
    '--hcc-button-bg-color': backgroundColor,
    '--hcc-button-bg-hover-color': backgroundHoverColor,
  };
};
