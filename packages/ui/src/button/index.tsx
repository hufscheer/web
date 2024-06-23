import { clsx } from 'clsx';
import { ElementType, forwardRef, ReactNode } from 'react';

import * as styles from './Button.css';
import {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../modal/type';

export type ButtonVariantType = 'normal' | 'gray';

type BaseButtonProps = {
  variant?: ButtonVariantType;
  width?: string;
  children: ReactNode;
};

type ButtonProps<C extends ElementType> = PolymorphicComponentProps<
  C,
  BaseButtonProps
>;
type ButtonType = <C extends ElementType = 'button'>(
  props: PolymorphicComponentPropsWithRef<C, ButtonProps<C>>,
) => ReactNode;

const Button: ButtonType = forwardRef(function Button<
  C extends ElementType = 'button',
>(
  { as, variant = 'normal', width, children, ...props }: ButtonProps<C>,
  ref: PolymorphicRef<C>,
) {
  const Component = as || 'button';

  return (
    <Component
      ref={ref}
      className={clsx(styles.buttonBase, styles.buttonVariants[variant])}
      style={{ width: width || 'auto' }}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;
