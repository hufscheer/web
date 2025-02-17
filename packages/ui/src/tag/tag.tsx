import { RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import * as styles from './styles.css';

type TagVariants = RecipeVariants<typeof styles.variants>;

export type TagProps = {
  asChild?: boolean;
} & ComponentPropsWithoutRef<'span'> &
  TagVariants;

export const Tag = ({
  colorScheme = 'primary',
  className,
  children,
  ...props
}: TagProps) => {
  return (
    <span
      className={clsx(styles.variants({ colorScheme }), className)}
      {...props}
    >
      {children}
    </span>
  );
};
