import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { match } from 'ts-pattern';
import { fontWeight as fontWeightToken, color as token } from '../token';
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

const getColorStyle = (color: ButtonColor, variant: ButtonVariant) => {
  const fontColor = match([color, variant])
    .with(['black', 'solid'], ['primary', 'solid'], ['danger', 'solid'], () => token.white)
    .with(['black', 'subtle'], ['black', 'ghost'], () => token.neutral900)
    .with(['primary', 'subtle'], ['primary', 'ghost'], () => token.primary600)
    .with(['danger', 'subtle'], ['danger', 'ghost'], () => token.danger600)
    .exhaustive();

  const backgroundColor = match([color, variant])
    .with(['black', 'solid'], () => token.neutral900)
    .with(['black', 'subtle'], () => token.neutral50)
    .with(['primary', 'solid'], () => token.primary600)
    .with(['primary', 'subtle'], () => token.primary100)
    .with(['danger', 'solid'], () => token.danger600)
    .with(['danger', 'subtle'], () => token.danger100)
    .otherwise(() => token.transparent);

  const backgroundHoverColor = match([color, variant])
    .with(['black', 'solid'], () => token.neutral700)
    .with(['black', 'subtle'], () => token.neutral100)
    .with(['black', 'ghost'], () => token.neutral50)
    .with(['primary', 'solid'], () => token.primary700)
    .with(['primary', 'subtle'], () => token.primary200)
    .with(['primary', 'ghost'], () => token.primary50)
    .with(['danger', 'solid'], () => token.danger700)
    .with(['danger', 'subtle'], () => token.danger200)
    .with(['danger', 'ghost'], () => token.danger50)
    .otherwise(() => token.transparent);

  return {
    '--hcc-button-font-color': fontColor,
    '--hcc-button-bg-color': backgroundColor,
    '--hcc-button-bg-hover-color': backgroundHoverColor,
  };
};

export const getFontSize = (size: ButtonSize) => {
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 14;
    case 'md':
      return 14;
    case 'lg':
      return 16;
    case 'xl':
      return 18;
  }
};

export const getFontWeight = (size: ButtonSize) => {
  switch (size) {
    case 'xs':
      return 'medium';
    case 'sm':
      return 'medium';
    case 'md':
      return 'semiBold';
    case 'lg':
      return 'semiBold';
    case 'xl':
      return 'semiBold';
  }
};

export const getHeight = (size: ButtonSize) => {
  switch (size) {
    case 'xs':
      return 28;
    case 'sm':
      return 36;
    case 'md':
      return 44;
    case 'lg':
      return 52;
    case 'xl':
      return 60;
  }
};
