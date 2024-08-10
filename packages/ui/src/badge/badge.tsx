import { Slot } from '@radix-ui/react-slot';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import * as styles from './styles.css';

type BadgeVariants = RecipeVariants<typeof styles.badgeVariants>;
type BadgeProps = {
  asChild?: boolean;
} & ComponentPropsWithoutRef<'span'> &
  BadgeVariants;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      asChild = false,
      colorScheme = 'primary',
      color = 'white',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'span';

    return (
      <Comp
        ref={ref}
        className={clsx(
          styles.badgeVariants({ colorScheme, color }),
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge };
