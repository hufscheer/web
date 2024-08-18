import { Slot } from '@radix-ui/react-slot';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import * as styles from './styles.css';

type ButtonVariants = RecipeVariants<typeof styles.variants>;
type ButtonProps = {
  asChild?: boolean;
} & ComponentPropsWithoutRef<'button'> &
  ButtonVariants;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      colorScheme = 'primary',
      justify = 'center',
      fullWidth,
      size = 'md',
      fontWeight = 'medium',
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
          styles.variants({
            colorScheme,
            fullWidth,
            justify,
            size,
            fontWeight,
          }),
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

export { Button };
