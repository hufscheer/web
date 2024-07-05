import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import * as React from 'react';

import * as styles from './styles.css';

type ButtonColorSchemes = keyof typeof styles.buttonColorScheme;
type ButtonAlignment = keyof typeof styles.justify;

interface BaseButtonProps {
  colorScheme?: ButtonColorSchemes;
  fullWidth?: boolean;
  justify?: ButtonAlignment;
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseButtonProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      colorScheme = 'primary',
      justify = 'center',
      fullWidth,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={clsx(
          styles.buttonBase,
          styles.buttonColorScheme[colorScheme],
          styles.justify[justify],
          fullWidth && styles.fullWidth,
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, type ButtonColorSchemes };
