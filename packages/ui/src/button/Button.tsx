import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { match } from 'ts-pattern';
import { color as colorToken } from '../token';
import styles from './Button.module.css';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonColor = 'black' | 'white' | 'primary' | 'danger';

type ButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost';

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
      size = 'medium',
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
      ...getButtonStyle({ color, variant }),
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

const getButtonStyle = ({ color, variant }: { color: ButtonColor; variant: ButtonVariant }) => {
  const backgroundColor = match([color, variant])
    .with(['black', 'solid'], () => colorToken.neutral900)
    .with(['black', 'subtle'], () => colorToken.neutral50)
    .with(['white', 'solid'], () => colorToken.white)
    .with(['white', 'subtle'], () => colorToken.white)
    .with(['primary', 'solid'], () => colorToken.primary600)
    .with(['primary', 'subtle'], () => colorToken.primary100)
    .with(['danger', 'solid'], () => colorToken.danger600)
    .with(['danger', 'subtle'], () => colorToken.danger100)
    .otherwise(() => colorToken.transparent);

  const borderColor = match([color, variant])
    .with(['black', 'outline'], () => `1px solid ${colorToken.neutral900}`)
    .with(['white', 'outline'], () => `1px solid ${colorToken.white}`)
    .with(['primary', 'outline'], () => `1px solid ${colorToken.primary600}`)
    .with(['danger', 'outline'], () => `1px solid ${colorToken.danger600}`)
    .otherwise(() => 'none');

  const fontColor = match([color, variant])
    .with(['black', 'solid'], () => colorToken.white)
    .with(['black', 'subtle'], () => colorToken.neutral900)
    .with(['black', 'outline'], () => colorToken.neutral900)
    .with(['black', 'ghost'], () => colorToken.neutral900)
    .with(['white', 'solid'], () => colorToken.neutral900)
    .with(['white', 'subtle'], () => colorToken.neutral900)
    .with(['white', 'outline'], () => colorToken.neutral900)
    .with(['white', 'ghost'], () => colorToken.neutral900)
    .with(['primary', 'solid'], () => colorToken.white)
    .with(['primary', 'subtle'], () => colorToken.primary600)
    .with(['primary', 'outline'], () => colorToken.primary600)
    .with(['primary', 'ghost'], () => colorToken.primary600)
    .with(['danger', 'solid'], () => colorToken.white)
    .with(['danger', 'subtle'], () => colorToken.danger600)
    .with(['danger', 'outline'], () => colorToken.danger600)
    .with(['danger', 'ghost'], () => colorToken.danger600)
    .exhaustive();

  return {
    '--hcc-button-background-color': backgroundColor,
    '--hcc-button-border-color': borderColor,
    '--hcc-button-font-color': fontColor,
  };
};
