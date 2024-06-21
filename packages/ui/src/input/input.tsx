import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import * as styles from './styles.css';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(styles.input, className)}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
