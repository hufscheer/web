import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import * as React from 'react';

import * as styles from './styles.css';

export type ButtonColorSchemeType = 'primary' | 'secondary';

interface BaseButtonProps {
  colorScheme?: ButtonColorSchemeType;
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseButtonProps {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, colorScheme = 'primary', className, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={clsx(
          styles.buttonBase,
          styles.buttonColorScheme[colorScheme],
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
